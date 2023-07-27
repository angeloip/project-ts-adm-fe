export interface Product {
  _id?: string
  name: string
  description: string
  price: number
  discountPercentage?: number
  rating?: number
  stock: number
  category: string
  thumbnail: File | string
  createdAt?: Date
  updatedAt?: Date
}

export interface ProductResponse {
  thumbnail: Thumbnail
  _id: string
  name: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  category: string
  createdAt: Date
  updatedAt: Date
}

export interface Thumbnail {
  url: string
  public_id: string
}
