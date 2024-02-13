export interface Root {
  status: number
  type: string
  message: string
  data: Data
}

export interface Data {
  docs: Doc[]
  total: number
  limit: number
  page: number
  pages: number
}

export interface Doc {
  _id: string
  user_id: string
  user: string
  property_type_data: PropertyTypeData
  property_type_id: string
  property_type: string
  sub_type_id: string
  sub_type: string
  tenancy_id: string
  tenancy: string
  unique_id: number
  property_name: string
  tenant_brand_data: TenantBrandDaum[]
  address: string
  address_line_2: string
  lat: number
  long: number
  city: string
  county: string
  state_id: string
  state: string
  isTaxFree: boolean
  region_id: string[]
  zipcode: string
  region: string[]
  price: number
  sold_price: number
  cap: number
  closed_cap: number
  term: number
  lease_type_data: LeaseTypeData
  lease_type_id: string
  lease: string
  credit_data: CreditDaum[]
  corp_franchisee_unit_count: string
  days_to_close: number
  noi: number
  closing_noi: number
  groundLease: string
  stories: any
  country: string
  dom: number
  list_date: string
  list_closing_date: string
  increases: string
  lease_start?: string
  lease_end: string
  options: string
  sales: any
  assumptions: string[]
  tenant_unit: string
  vacancy_perc: number
  traffic: number
  pop_1_mile?: number
  pop_3_mile: number
  pop_5_mile: number
  hh_1_mile?: number
  hh_3_mile: number
  hh_5_mile: number
  size_sqft: number
  per_sqft_price: number
  per_sqft_rent_price: any
  lot_ac: number
  year_built: string
  unit_price: any
  notes_data: any[]
  pictures: any[]
  om: string
  broker_name: string
  company: string
  email: string
  status: string
  request_status: string
  isDeleted: boolean
  createdAt: string
  tenant_brand_id: string[]
  credit_id: string[]
  notes_id: any[]
  rent_bump: string
  rent_bump_text: string
  updatedAt: string
  update_date: string
}

export interface PropertyTypeData {
  _id: string
  title: string
  status: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export interface TenantBrandDaum {
  _id: string
  title: string
  image: string
  property_sub_Id: string
}

export interface LeaseTypeData {
  _id: string
  title: string
  status: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export interface CreditDaum {
  _id: string
  title: string
}
