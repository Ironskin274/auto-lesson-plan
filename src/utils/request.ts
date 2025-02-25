import axios from 'axios'
import { useUserStore } from '@/store/user'
import {getRequestKey,removePending} from './requestOptimize'
import router from '@/router'

/*
解决方案
在路由钩子函数进行用户状态模块的获取，调用路由钩子的时候
，意味着全局状态已完全初始化完成。但会造成每次调用路由钩子都获取用户状态模块，
会造成资源的浪费（当然可以达到预期目的，但并不是我们需要的）。我们可以在外层声明一个变量用来存储状态
，在路由钩子中进行判断，如果当前变量为空，也就意味着状态还没有进行过获取，在当前情况下进行状态获取
（类似于单例）。
 */
let UserStore : any = null

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  'timeout': 600000
})

// Request interceptors 请求拦截器，对每一个请求加上token以便后端校验
service.interceptors.request.use(
  (config: any) => {
      if(UserStore == null) {
          UserStore = useUserStore()
      }
    // Add X-Access-Token header to every request, you can add other custom headers here
    if (UserStore.token) {
      config.headers['token'] = UserStore.token
    } else if (UserStore.token && config.url != '/login') {
      window.location.href = '/login'
      return false
    }
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response: any) => {
      if(UserStore == null) {
          UserStore = useUserStore()
      }
    // console.log(response, 'response')
    if (response.data.status === 401) {
      router.push('/login')
    }
    //请求响应中的config的url会带上代理的api需要去掉
    response.config.url = response.config.url.replace('/api', '')
    // 请求完成，删除请求中状态
    const key = getRequestKey(response.config);
    removePending(key);
    if (response.data.code === 1) {
      return response
    }
    return response
  },
  (error: any) => {
    // console.log(error.config, pending, 'error')
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          router.push('/login')
          break;
        case 405:
          error.message = '请求错误'
      }
    }
    //请求响应中的config的url会带上代理的api需要去掉
    error.config.url = error.config.url.replace('/api', '')
    // 请求完成，删除请求中状态
    const key = getRequestKey(error.config);
    removePending(key);
    return Promise.reject(error)
  }
)

export default service
