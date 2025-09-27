export interface auth {
  user: User
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role_id: string
  point: any
  createdAt: string
  updatedAt: string
  deletedAt: any
}
