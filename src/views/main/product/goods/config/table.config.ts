export const contentTableConfig = {
  title: '商品介绍',
  propList: [
    { prop: 'name', label: '用户名', minWidth: '80' },
    { prop: 'oldPrice', label: '原价', minWidth: '80' },
    { prop: 'newPrice', label: '现价', minWidth: '80' },
    { prop: 'desc', label: '描述', minWidth: '120' },
    { prop: 'imgUrl', label: 'img', minWidth: '100' },
    { prop: 'address', label: '地址', minWidth: '80' },
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
