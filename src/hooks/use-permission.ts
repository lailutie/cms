import { useStore } from '@/store'

export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore()
  const permissions = store.state.loginModel.permissions
  const verifyPermission = `system:${pageName}:${hanldeName}`

  return !!permissions.find((item) => item === verifyPermission)
}
