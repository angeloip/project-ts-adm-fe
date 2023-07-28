interface Default {
  name: string
  description: string
  price: number
  stock: number
}

export interface Product extends Default {
  discountPercentage?: number
  category: string
  thumbnail: File | string
}

export interface ProductResponse extends Default {
  thumbnail: Thumbnail
  _id: string
  discountPercentage: number
  rating: number
  category: Category
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  _id: string
  name: string
}

export interface Thumbnail {
  url: string
  public_id: string
}
