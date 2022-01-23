import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 四种拦截器定义成为接口来限定别人传入的东西
export interface SFRequsetInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (config: T) => T
  // responseInterceptor?: (config: any) => any
  responseInterceptorCatch?: (err: any) => any
}

// config继承 ... 用于为传入的 config 增加拦截器
export interface SFRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  intercaptors?: SFRequsetInterceptors<T>
  showLoading?: boolean
}
