import sfRequset from '../../index'

import type { IDataType } from '@/service/type'

export function getPageListData(url: string, queryInfo?: any) {
  return sfRequset.post<IDataType>({
    url: url,
    data: queryInfo
  })
}

export function deletePageListData(url: string) {
  return sfRequset.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return sfRequset.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return sfRequset.patch<IDataType>({
    url: url,
    data: editData
  })
}
