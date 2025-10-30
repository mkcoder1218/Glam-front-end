export interface PointRoot {
  status: string
  message: string
  count: number
  data: PointDaum[]
  meta: Meta
  timestamp: string
}

export interface PointDaum {
  id: string
  point: number
  reedem_amount: number
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface Meta {
  limit: number
  offset: number
  total: number
}
