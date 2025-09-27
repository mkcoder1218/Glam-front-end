export interface role_Root {
  status: string
  message: string
  count: number
  data: role_Daum[]
  meta: Meta
  timestamp: string
}

export interface role_Daum {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  rules: role_Rule[]
}

export interface role_Rule {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  deletedAt: any
  RoleAccessRule: role_RoleAccessRule
}

export interface role_RoleAccessRule {
  id: string
  role_id: string
  access_rule_id: string
  createdAt: string
  updatedAt: string
  deletedAt: any
}

export interface Meta {
  limit: number
  offset: number
}
