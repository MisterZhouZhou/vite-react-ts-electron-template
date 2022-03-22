/*
 * @Author: misterzhou
 * @Date: 2022-03-22 12:05:41
 * @LastEditTime: 2022-03-22 14:50:47
 * @LastEditors: misterzhou
 * @FilePath: /vite-react-ts-electron-template/src/api/request.ts
 * @Description:
 */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { CT } from '@/config'

export interface AxiosError {
	response?: {
		data: object
	}
	message?: string
}

// 创建 axios 实例
const request = axios.create({
	timeout: CT.timeout // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error: AxiosError): Promise<never> => {
	if (error.response) {
		const data = error.response.data
		console.log('$---', data)
	}
	return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config: AxiosRequestConfig) => {
	// 自定义全局header
	const headers = config.headers ? config.headers : {}
	headers['Content-Type'] = 'application/json'
	return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response: AxiosResponse) => {
	const { status, data } = response
	if (status === 200 && data) {
		return data
	}
	return Promise.reject(data)
}, errorHandler)

export default request
