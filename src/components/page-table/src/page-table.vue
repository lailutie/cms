<template>
  <div class="page-table">
    <sf-table
      :listData="userList"
      :listCount="listCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <template #headerHandler>
        <el-button
          type="primary"
          size="medium"
          v-if="isCreate"
          @click="handleNewClick"
          >新建</el-button
        >
      </template>
      <template #status="scope">
        <el-button
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
      <template #createAt="scope">
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler="scope">
        <div class="handler">
          <el-button
            v-if="isUpdate"
            type="text"
            size="mini"
            icon="el-icon-edit"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="handlerDeleteClick(scope.row)"
            >删除</el-button
          >
        </div>
      </template>
    </sf-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'

import SfTable from '@/base-ui/table/index'

import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    SfTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 获取用户权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 最下方的页码的双向绑定
    const pageInfo = ref({ currentPage: 0, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 网络请求

    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) {
        return
      }
      if (props.pageName === 'users') {
        store.dispatch('systemModule/getPageUsersAction', {
          pageUrl: '/users/list',
          queryInfo: {
            offset: pageInfo.value.pageSize * pageInfo.value.currentPage,
            size: pageInfo.value.pageSize,
            ...queryInfo
          }
        })
        // console.log(props.pageName)
      } else if (props.pageName === 'menu') {
        store.dispatch('systemModule/getPageMenuAction', {
          pageUrl: '/menu/list'
        })

        // console.log(props.pageName)
      } else if (props.pageName === 'role') {
        store.dispatch('systemModule/getPageRoleAction', {
          pageUrl: '/role/list',
          queryInfo: {
            offset: pageInfo.value.pageSize * pageInfo.value.currentPage,
            size: pageInfo.value.pageSize,
            ...queryInfo
          }
        })

        // console.log(props.pageName)
      } else if (props.pageName === 'department') {
        store.dispatch('systemModule/getPageDepartmentAction', {
          pageUrl: '/department/list',
          queryInfo: {
            offset: pageInfo.value.pageSize * pageInfo.value.currentPage,
            size: pageInfo.value.pageSize,
            ...queryInfo
          }
        })
      } else {
        console.log('一个都没有进去')
      }
    }
    getPageData()

    let userList: any
    let listCount: any

    const listFn = () => {
      if (props.pageName === 'users') {
        userList = computed(() => store.state.systemModule.userList)
      } else if (props.pageName === 'role') {
        userList = computed(() => store.state.systemModule.roleList)
      } else if (props.pageName === 'menu') {
        userList = computed(() => store.state.systemModule.menuList)
      } else if (props.pageName === 'department') {
        userList = computed(() => store.state.systemModule.departmentList)
      } else {
        return console.log('未知的list')
      }
    }
    listFn()

    const countFn = () => {
      if (props.pageName === 'users') {
        listCount = computed(() => store.state.systemModule.userCount)
      } else if (props.pageName === 'role') {
        listCount = computed(() => store.state.systemModule.roleCount)
      } else if (props.pageName === 'menu') {
        listCount = computed(() => store.state.systemModule.menuCount)
      } else if (props.pageName === 'department') {
        listCount = computed(() => store.state.systemModule.departmentCount)
      } else {
        return console.log('未知的list')
      }
    }
    countFn()

    // 增删改操作
    const handlerDeleteClick = (item: any) => {
      console.log(item)
      store.dispatch('systemModule/deletePageAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    return {
      userList,
      listCount,
      getPageData,
      pageInfo,
      isCreate,
      isUpdate,
      isDelete,
      handlerDeleteClick,
      handleEditClick,
      handleNewClick
    }
  }
})
</script>

<style lang="less" scoped>
.page-table {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
