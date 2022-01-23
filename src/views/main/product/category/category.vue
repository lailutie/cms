<template>
  <div class="categroy">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-table
      :contentTableConfig="contentTableConfig"
      :pageName="categroy"
    ></page-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageSearch from '@/components/page-search'
import PageTable from '@/components/page-table'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/table.config'

export default defineComponent({
  name: 'category',
  components: {
    PageSearch,
    PageTable
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>

<style scoped></style>
