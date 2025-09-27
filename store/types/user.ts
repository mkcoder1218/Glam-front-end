export interface User {
  status: string
  message: string
  count: number
  data: Daum[]
  meta: Meta
  timestamp: string
}
export interface Detailed {
  status: string
  message: string
  count: number
  data: Daum
  meta: Meta
  timestamp: string
}


export interface Daum {
  id: string
  name: string
  email: string
  password: string
  role_id: string
  point: number
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface Meta {
  limit: number
  offset: number
}
