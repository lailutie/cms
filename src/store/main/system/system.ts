import { Module } from 'vuex'

import type { ISystemState } from './type'
import type { IRootState } from '@/store/type'

import {
  getPageListData,
  deletePageListData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      roleList: [],
      roleCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0
    }
  },
  mutations: {
    changeUserList(state, userList: any[]) {
      state.userList = userList
    },
    changeUserCount(state, userCount: number) {
      state.userCount = userCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    }
  },
  actions: {
    async getPageUsersAction({ commit }, payload: any) {
      // console.log(payload)
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      )
      const { list, totalCount } = pageResult.data
      commit('changeUserList', list)
      commit('changeUserCount', totalCount)
    },
    async getPageMenuAction({ commit }, payload: any) {
      // console.log(payload)
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      )
      console.log(pageResult)

      const { list } = pageResult.data
      commit('changeMenuList', list)
      // commit('changeMenuCount', totalCount)
    },
    async getPageRoleAction({ commit }, payload: any) {
      // console.log(payload)
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      )
      console.log(pageResult)

      const { list, totalCount } = pageResult.data
      commit('changeRoleList', list)
      commit('changeRoleCount', totalCount)
    },
    async getPageDepartmentAction({ commit }, payload: any) {
      // console.log(payload)
      const pageResult = await getPageListData(
        payload.pageUrl,
        payload.queryInfo
      )
      console.log(pageResult)

      const { list, totalCount } = pageResult.data
      commit('changeDepartmentList', list)
      commit('changeDepartmentCount', totalCount)
    },
    // 删除操作
    async deletePageAction({ dispatch }, payload: any) {
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`

      await deletePageListData(pageUrl)

      // delete after emit network
      const changeName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      dispatch(`getPage${changeName}Action`, {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)

      // 2.请求最新的数据
      const changeName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      dispatch(`getPage${changeName}Action`, {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },

    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      console.log(editData)
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)

      // 2.请求最新的数据
      const changeName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      dispatch(`getPage${changeName}Action`, {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default systemModule
