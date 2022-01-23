export const contentTableConfig = {
  title: '菜单列表',
  propList: [
    { prop: 'name', label: '系统总览', minWidth: '100' },
    { prop: 'url', label: 'URL', minWidth: '100' },
    { prop: 'icon', label: 'icon', minWidth: '100' },
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
