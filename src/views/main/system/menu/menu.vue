<template>
  <div class="menu">
    <page-table
      pageName="menu"
      :contentTableConfig="contentTableConfig"
    ></page-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageTable from '@/components/page-table'

import { contentTableConfig } from './config/table.config'

export default defineComponent({
  name: 'system-menu',
  components: {
    PageTable
  },
  setup() {
    return {
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
