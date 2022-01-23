<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script lang="ts">
import LoginPanel from './cpns/login-panel.vue'

import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    LoginPanel
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: url('../../assets/img/login-bg.svg');
}
</style>
