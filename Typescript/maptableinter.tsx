export interface Rootmaptable {
  status: number
  type: string
  message: string
  data: Daum[]
  showError: boolean
  errorMessage: string
}

export interface Daum {
  location: Location
  type: string
  count: number
  label: number
  cluster_id: any
  zoom_more: boolean
  ids: any[]
  more_data: MoreData
}

export interface Location {
  lat: number
  lng: number
}

export interface MoreData {
  _id: string
  user_id: string
  user: string
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
  city: string
  zipcode: string
  county: string
  state_id: string
  state: string
  region_id: any
  region: any
  price: number
  sold_price: number
  cap: number
  closed_cap: number
  term: number
  lease_type_id: string
  lease: any
  lease_type_data: any
  credit_data: CreditDaum[]
  corp_franchisee_unit_count: string
  dom: number
  noi: number
  closing_noi: number
  groundLease: string
  stories: any
  country: string
  increases: string
  lease_start?: string
  lease_end: string
  list_date: string
  list_closing_date: string
  options: string
  sales: any
  assumptions: string[]
  tenant_unit: string
  vacancy_perc: number
  traffic: number
  pop_1_mile: number
  pop_3_mile: number
  pop_5_mile: number
  hh_1_mile: number
  hh_3_mile: number
  hh_5_mile: number
  size_sqft: number
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
  update_date: string
}

export interface TenantBrandDaum {
  _id: string
  title: string
  image: string
  property_sub_Id: string
}

export interface CreditDaum {
  _id: string
  title: string
}
