/*
 * @Author: misterzhou
 * @Date: 2022-03-22 12:05:20
 * @LastEditTime: 2022-03-22 14:36:02
 * @LastEditors: misterzhou
 * @FilePath: /vite-react-ts-electron-template/src/api/service.ts
 * @Description:
 */
import request from './request'
import URLS from './url'

// 获取env的环境变量
const urlHost = import.meta.env.VITE_BASE_URL

// 获取随机音乐信息
export const getRandMusic = () => {
	return request.get(URLS.randomMusic)
}
