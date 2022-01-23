import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './type'

import { getPageListData } from '@/service/main/system/system'

import loginModel from './login/login'
import systemModule from './main/system/system'
import dashboard from './main/analysis/dashboard'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'sf',
      age: 18,
      entireDepartment: [],
      entireRole: []
    }
  },

  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const { list: roleList } = roleResult.data

      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
    }
  },
  modules: {
    loginModel,
    systemModule,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('loginModel/loadLocalLogin')
  store.dispatch('getInitialDataAction')
}

// why vuex对ts的支持不好而封装的方法。也可以使用库pinia
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
