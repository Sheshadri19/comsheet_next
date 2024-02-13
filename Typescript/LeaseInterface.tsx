export interface RootLease {
    status: number
    type: string
    message: string
    data: Daum[]
  }
  
  export interface Daum {
    _id: string
    title: string
  }
  