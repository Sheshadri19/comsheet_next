export interface propType {
    status: number
    type: string
    message: string
    data: Daum[]
  }
  
  export interface Daum {
    _id: string
    title: string
    status: string
    isDeleted: boolean
    createdAt: string
    updatedAt: string
    property_sub_types: PropertySubType[];
  }
  
  export interface PropertySubType {
    _id: string
    property_Id: string
    title: string
    property_type?: string
    status: string
    isDeleted: boolean
    createdAt: string
    updatedAt: string
  }
  