export interface GalleryRoot {
  status: string
  message: string
  count: number
  data: GalleryDaum[]
  meta: Meta
  timestamp: string
}

export interface GalleryDaum {
  id: string
  name: string
  file_id: string
  description: string
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface Meta {
  limit: number
  offset: number
  total: number
}
