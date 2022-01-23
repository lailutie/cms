export const contentTableConfig = {
  title: '角色介绍',
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'id', label: 'ID', minWidth: '100' },
    { prop: 'intro', label: '介绍', minWidth: '100' },
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
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
