export interface IAccount {
  name: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

// export interface Role {
//   id: number
//   name: string
//   intro: string
//   createAt?: Date
//   updateAt: Date
// }

// export interface Department {
//   id: number
//   name: string
//   parentId: any
//   creteAt: Date
//   updateAt: Date
//   leader: string
// }

// export interface IUserInfo {
//   id: number
//   name: string
//   realname: string
//   cellphone: number
//   enable: number
//   createAt: Date
//   updateAt: Date
//   role: Role
//   department: Department
// }
