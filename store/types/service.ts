export interface service_Root {
    status: string
    message: string
    count: number
    data: Service_Daum[]
    meta: Meta
    timestamp: string
  }
  
  export interface Service_Daum {
    id: string
    name: string
    price: string
    duration: string
    description: string
    category_id: string
    discount: number
    rating: number
    review_id: any
    file_id: string
    createdAt: string
    updatedAt: string
    deletedAt: any
    File: Service_File
  }
  
  export interface Service_File {
    id: string
    description: any
    url: any
    path: any
    createdAt: string
    updatedAt: string
    deletedAt: any
  }
  
  export interface Meta {
    limit: number
    offset: number
  }
  