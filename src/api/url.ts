/*
 * @Author: misterzhou
 * @Date: 2022-03-22 12:05:08
 * @LastEditTime: 2022-03-22 14:33:56
 * @LastEditors: misterzhou
 * @FilePath: /vite-react-ts-electron-template/src/api/url.ts
 * @Description:
 */
import { URL } from '@/config'

export default {
	// get 随机音乐
	randomMusic: `${URL.musicUrl}/rand.music?sort=热歌榜&format=json`
}
