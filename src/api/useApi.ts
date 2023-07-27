import axios from '../config/axios'
import { type Product } from '../interfaces/product'

export const useApi = () => {
  const createProductRequest = async (product: Product) => {
    const form = new FormData()
    for (const key in product) {
      const value = product[key as keyof Product]
      if (value instanceof File) {
        form.append(key, value)
      } else {
        form.append(key, value.toString())
      }
    }
    return await axios.post('/product', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
  return { createProductRequest }
}
