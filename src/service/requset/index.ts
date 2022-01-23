import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { SFRequsetInterceptors, SFRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEAFULT_LOADING = true

class SFRequset {
  // 用于创建多个实例，防止出现有多个不同的 base_url 的情况。
  instance: AxiosInstance
  // 拦截器
  interceptors?: SFRequsetInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: SFRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.intercaptors

    // 对loading进行赋值，如果有传入就使用传入的值，没有就使用默认值
    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加全局的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 请求成功loading关闭
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('服务器请求失败')
        } else {
          return data
        }
        return res
      },
      (err) => {
        // 请求失败也要关闭
        this.loading?.close()

        if (err.response.status === 404) {
          console.log('404的错误')
        }
        return err
      }
    )
  }

  request<T = any>(config: SFRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 请求拦截器封装
      if (config.intercaptors?.requestInterceptor) {
        config = config.intercaptors.requestInterceptor(config)
      }

      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.intercaptors?.responseInterceptor) {
            res = config.intercaptors.responseInterceptor(res)
          }
          resolve(res)

          // 控制某一次 loading 不需要加载之后，将loading设置为默认值
          this.showLoading = DEAFULT_LOADING
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LOADING
          reject(err)
        })
    })
  }

  get<T = any>(config: SFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: SFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: SFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: SFRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default SFRequset
