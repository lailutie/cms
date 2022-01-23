import { ILoginState } from './login/type'
import { ISystemState } from './main/system/type'
import { IDashboardState } from './main/analysis/types'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
}

export interface IRootWithModule {
  loginModel: ILoginState
  systemModule: ISystemState
  dashboard: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
