export interface ApiResponse {
    status: string
    code: number
    locale: string
    seed: any
    total: number
    data: Person[]
  }
  
  export interface Person {
    id: number
    firstname: string
    lastname: string
    email: string
    phone: string
    birthday: string
    gender: string
    address: Address
    website: string
    image: string
  }
  
  export interface Address {
    id: number
    street: string
    streetName: string
    buildingNumber: string
    city: string
    zipcode: string
    country: string
    country_code: string
    latitude: number
    longitude: number
  }
  