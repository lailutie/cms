import { Module } from 'vuex'

import {
  accountLoginRequset,
  requestUserInfoById,
  requestUserMenusRoleById
} from '@/service/login/login'
import localCatch from '@/utils/cache'
import router from '@/router'
import { mapMenusToRouters, mapMenusToPermissions } from '@/utils/map-menus'

import { IAccount } from '@/service/login/type'
import { IRootState } from '../type'
import { ILoginState } from './type'

const loginModel: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      const routes = mapMenusToRouters(userMenus)
      // console.log(routes)
      routes.forEach((route) => {
        router.addRoute('Main', route)
      })

      // user获取按钮权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // console.log('执行accountLoginAction', payload)
      // 实现登录逻辑
      const loginResult = await accountLoginRequset(payload)
      // console.log(loginResult)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      // token进行本地缓存
      localCatch.setCatch('token', token)

      // 用户信息数据
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCatch.setCatch('userInfo', userInfo)

      // 请求用户菜单
      const userMenusResult = await requestUserMenusRoleById(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCatch.setCatch('userMenus', userMenus)

      // 路由跳转
      router.push('/main')
    },
    loadLocalLogin({ commit }) {
      const token = localCatch.getCatch('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCatch.getCatch('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCatch.getCatch('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModel
