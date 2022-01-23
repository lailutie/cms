import { ref } from 'vue'
import PageTable from '@/components/page-table'

export function usePageSearch() {
  const pageTableRef = ref<InstanceType<typeof PageTable>>()
  const resetBtnClick = () => {
    pageTableRef.value?.getPageData()
  }

  const queryBtnClick = (queryInfo: any) => {
    pageTableRef.value?.getPageData(queryInfo)
  }
  return [pageTableRef, resetBtnClick, queryBtnClick]
}
