/*
 * @Author: misterzhou
 * @Date: 2022-04-08 12:16:54
 * @LastEditTime: 2022-04-09 10:53:13
 * @LastEditors: misterzhou
 * @FilePath: /vite-react-ts-electron-template/scripts/make.js
 * @Description: electron-builder 打包配置
 */
const builder = require('electron-builder')
const pkg = require('../package.json')
const fse = require('fs-extra')
const path = require('path')

// home
const homedir = require('os').homedir()

// 根目录
const root_dir = path.normalize(path.join(__dirname, '..'))
// 打包输出目录
// const dist_dir = path.normalize(path.join(__dirname, '..', 'dist'))

// 语言配置
// const electronLanguages = ['en', 'fr', 'zh_CN', 'de']

// 打包平台配置
const TARGET_PLATFORMS_configs = {
  mac: {
    // 'default'
    mac: ['dmg', 'zip']
  },
  macs: {
    mac: ['dmg:x64', 'dmg:arm64']
  },
  win: {
    win: ['nsis:ia32', 'nsis:x64', 'portable:ia32']
  },
  all: {
    mac: ['dmg:x64', 'dmg:arm64', 'dmg:universal'],
    linux: ['AppImage:x64', 'deb:x64'],
    win: ['nsis:ia32', 'nsis:x64', 'portable:ia32']
  }
}

// app name
const APP_NAME = pkg.name
// const { IDENTITY } = process.env

// 通用配置
const cfg_common = {
  copyright: `Copyright © ${new Date().getFullYear()}`,
  buildVersion: pkg.version[3].toString(),
  // 打包出的app文件名称，可以通过变量指定，比如这个配置打包后名称可能为`Electron Builder-1.0.0-latest.dmg`
  artifactName: '${productName}_mac_${arch}_${version}.${ext}',
  directories: {
    // 构建资源文件目录，不会打包到app中，如果需要打包其中的一些文件比如托盘图标，需要在files字段中指定，比如 `"files": ["**/*", "build/icon.*"]`
    buildResources: 'dist',
    // 打包输出目录
    output: `out/${pkg.version}`,
    // 包含package.json的应用目录，默认会读取 `app`, `www`,
    app: 'dist'
  },
  // 指定需要复制过去打包的文件，https://www.electron.build/configuration/contents#files
  // files: ["dist", "resources", "!node_modules"],
  // 在签名没有成功时打包程序会失败退出，在各平台的签名设置都配置好之后建议启用
  //forceCodeSigning: false
  // 发布选项，和更新服务器类型相关，这里我们选择generic， https://www.electron.build/configuration/publish
  //发布信息
  releaseInfo: {
    releaseName: '版本更新',
    releaseNotes: ''
  },
  electronDownload: {
    cache: path.join(homedir, '.electron'),
    mirror: 'https://npm.taobao.org/mirrors/electron/'
  }
}

/**
 * 将资源拷贝到build目录下
 * @param {Array} sourceArray 源文件和目标文件 [sourcePath, targetPath]
 *
 */
// const copyAssetsToBuild = (...sourceArrays) => {
//   // 将assets/app.png 拷贝到build/assets/app.png
//   const to_cp = [...sourceArrays]
//   // 遍历执行拷贝
//   to_cp.map(([src, target]) => {
//     fse.copySync(src, target)
//   })
// }

// 程序编译前
const beforeMake = () => {
  // 将dist移动到build
  // fse.moveSync(dist_dir, path.resolve(root_dir, 'build'))
  // // 清除打包目录
  // fse.removeSync(dist_dir)
  // // 确保有dist目录，没有则创建
  // fse.ensureDirSync(dist_dir)

  // 将assets/app.png 拷贝到build/assets/app.png
  // copyAssetsToBuild(
  //   [
  //     path.resolve(root_dir, 'resource/icons/app.png'),
  //     path.resolve(root_dir, 'dist/resource/icons/app.png'),
  //   ]
  // )
  // 打包配置
  let pkg_app = require(path.join(root_dir, 'resource', 'package.json'))
  pkg_app.name = APP_NAME
  pkg_app.productName = `${APP_NAME}-title`
  pkg_app.version = pkg.version
  if (pkg.description) pkg_app.description
  pkg_app.main = pkg.main
  pkg_app.dependencies = pkg.dependencies

  // 修改配置文件
  fse.writeFileSync(
    path.join(root_dir, 'dist', 'package.json'),
    JSON.stringify(pkg_app, null, 2),
    'utf-8'
  )
}

const doMake = async () => {
  console.log('-> make...')

  // 选择打包的环境
  let targets = TARGET_PLATFORMS_configs.all
  if (process.env.MAKE_FOR === 'dev') {
    targets = TARGET_PLATFORMS_configs.macs
  } else if (process.env.MAKE_FOR === 'mac') {
    targets = TARGET_PLATFORMS_configs.mac
  } else if (process.env.MAKE_FOR === 'win') {
    targets = TARGET_PLATFORMS_configs.win
  }

  await builder.build({
    //targets: Platform.MAC.createTarget(),
    ...targets,
    config: {
      ...cfg_common,
      appId: 'com.mz.electron-host',
      productName: APP_NAME,
      mac: {
        // type: 'distribution', // 发布类型
        icon: 'resource/icons/app.icns', // icon
        gatekeeperAssess: false,
        // electronLanguages, // 设置语言
        // identity: IDENTITY,
        category: 'public.app-category.developer-tools', // public.app-category.productivity
        // 管理macOS应用程序的安全保护和资源访问。https://developer.apple.com/documentation/security/hardened_runtime
        hardenedRuntime: true,
        // 权限
        entitlements: 'resource/entitlements.mac.plist',
        // entitlementsInherit: 'resource/entitlements.mac.plist',
        // provisioningProfile: 'resource/app.provisionprofile',
        extendInfo: {
          ITSAppUsesNonExemptEncryption: false,
          CFBundleDevelopmentRegion: 'en' // 打包环境en
          // CFBundleLocalizations: electronLanguages, // 语言配置
          // NSMicrophoneUsageDescription: 请允许访问您的麦克风
          // NSCameraUsageDescription: 请允许访问您的摄像头
        }
      },
      dmg: {
        // 配置安装窗口大小和背景图，图标和图标文字大小等
        icon: 'resource/icons/app.ico',
        title: '${productName}_${version}', // 默认会取应用的信息
        // background: 'resource/icons/dmg-bg.png', // 和backgroundColor只能指定一个
        backgroundColor: '#fff',
        iconSize: 160,
        window: {
          width: 600,
          height: 420
        },
        contents: [
          {
            x: 150,
            y: 200
          },
          {
            x: 450,
            y: 200,
            type: 'link',
            path: '/Applications'
          }
        ],
        sign: false
        // 打包出的app文件名称，可以通过变量指定，比如这个配置打包后名称可能为`Electron Builder-1.0.0-latest.dmg`
        // artifactName: '${productName}_mac_${arch}_${version}.${ext}',
      },
      win: {
        icon: 'resource/icons/app.ico'
        //requestedExecutionLevel: 'requireAdministrator'
      },
      nsis: {
        installerIcon: 'resource/icons/installer-icon.ico',
        oneClick: false,
        allowToChangeInstallationDirectory: true,
        artifactName: '${productName}_installer_${arch}_${version}.${ext}'
      },
      portable: {
        artifactName: '${productName}_portable_${arch}_${version}.${ext}'
      },
      linux: {
        icon: 'resource/icons/app.icns',
        artifactName: '${productName}_linux_${arch}_${version}.${ext}',
        category: 'Utility',
        synopsis: 'An App for hosts management and switching.',
        desktop: {
          Name: 'SwitchHosts',
          Type: 'Application',
          GenericName: 'An App for hosts management and switching.'
        }
      }
    }
  })
}

const afterMake = async () => {
  console.log('-> afterMake...')
}

// 程序入口
async function makeBuild() {
  try {
    console.log('-> make Start!')
    await beforeMake()
    await doMake()
    await afterMake()
    console.log('-> make Done!')
  } catch (e) {
    console.error('error---', e)
  }
}

makeBuild()
