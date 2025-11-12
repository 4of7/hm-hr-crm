import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

const service = axios.create({
  baseURL: '/api', // 设置基础URL，所有请求都会以此为前缀
  timeout: 5000 // 设置请求超时时间
})

service.interceptors.request.use(
  (config) => {
    // 注入token
    if (store.getters.token) config.headers.Authorization = `Bearer ${store.getters.token}`
    return config
  }, (error) => {
    return Promise.reject(error)
  })

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { data, message, success } = response.data
    if (success) {
      return data
    } else {
      Message({ message: message || '请求出错', type: 'error', duration: 5 * 1000 })
      return Promise.reject(new Error(message || '请求出错'))
    }
  }, async(error) => {
    if (error.response.status === 401) {
      Message({ type: 'warning', message: 'token超时了!' })
      // 调用action退出登录
      await store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(error)
    }
    Message({
      message: error.response.data.message || '请求出错',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
