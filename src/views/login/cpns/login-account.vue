<template>
  <div class="login-account">
    <!-- 为什么要有 :model 因为验证规则是在from组件中进行验证的 -->
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'

import type { ElForm } from 'element-plus'

import { rules } from '../config/account-config'
import LocalCatch from '../../../utils/cache'

export default defineComponent({
  setup() {
    const store = useStore()

    const account = reactive({
      name: LocalCatch.getCatch('name') ?? '',
      password: LocalCatch.getCatch('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 是否需要保存账号密码
          if (isKeepPassword) {
            LocalCatch.setCatch('name', account.name)
            LocalCatch.setCatch('password', account.password)
          } else {
            LocalCatch.removeCatch('password')
          }

          // 开始进行验证登录
          store.dispatch('loginModel/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style lang="less" scoped></style>
