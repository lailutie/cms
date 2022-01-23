import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import { globalRegister } from './global'
// 因为是element-plus的老版本，所以是这种引入方式
import 'element-plus/lib/theme-chalk/index.css'
import 'normalize.css'
import './assets/css/index.less'

import { setupStore } from '@/store/index'

setupStore()

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(globalRegister)
  .mount('#app')
