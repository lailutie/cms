export const contentTableConfig = {
  title: '角色介绍',
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'id', label: 'ID', minWidth: '100' },
    { prop: 'leader', label: '领导', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    }
  ],
  showIndexColumn: false,
  showSelectColumn: false
}
