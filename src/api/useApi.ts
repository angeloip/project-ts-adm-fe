import axios from '../config/axios'
import { type CategoryResponse } from '../interfaces/category'
import { type ProductResponse, type Product } from '../interfaces/product'

export const useApi = () => {
  const createProductRequest = async (product: Product) => {
    const form = new FormData()
    for (const key in product) {
      const value = product[key as keyof Product]
      if (value instanceof File) {
        form.append(key, value)
      } else {
        form.append(key, (value as string).toString())
      }
    }
    if (product.thumbnail === '') {
      form.delete('thumbnail')
    }
    return await axios.post('/product', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  const getProductsRequest = async () =>
    await axios.get<ProductResponse[]>('/product')

  const getProductRequest = async (id: string) =>
    await axios.get<ProductResponse>(`/product/${id}`)

  const updateProductRequest = async (
    id: string,
    product: Omit<Product, 'thumbnail'>
  ) => await axios.patch(`/product/${id}`, product)

  const updateProductPictureRequest = async (id: string, picture: File) => {
    const form = new FormData()
    form.append('thumbnail', picture)
    return await axios.patch(`/product/image/${id}`, form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  const deleteProductRequest = async (id: string) =>
    await axios.delete(`/product/${id}`)

  const createCategoryRequest = async (name: string) =>
    await axios.post('/category', { name })

  const getCategoriesRequest = async () =>
    await axios.get<CategoryResponse[]>('/category')

  const updateCategoryRequest = async (id: string, name: string) =>
    await axios.patch(`/category/${id}`, { name })

  const deleteCategoryRequest = async (id: string) =>
    await axios.delete(`/category/${id}`)

  return {
    createProductRequest,
    getProductsRequest,
    getProductRequest,
    updateProductRequest,
    updateProductPictureRequest,
    deleteProductRequest,
    createCategoryRequest,
    getCategoriesRequest,
    updateCategoryRequest,
    deleteCategoryRequest
  }
}
