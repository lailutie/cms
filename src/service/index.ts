// 网络请求统一出口
import SFRequset from './requset'
import { BASE_URL, TIME_OUT } from './requset/config'
import localCatch from '@/utils/cache'

const sfRequset = new SFRequset({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  intercaptors: {
    requestInterceptor: (config) => {
      // token拦截
      const token = localCatch.getCatch('token')
      if (token) {
        // config.headers.Authorization = `Bearer ${token}`
        if (config.headers !== undefined) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (config) => {
      return config
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default sfRequset
