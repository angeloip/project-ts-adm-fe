import { useEffect, useState } from 'react'
import { type Product } from '../interfaces/product'
import { useApi } from '../api/useApi'
import { Toast } from '../helpers/toast'
import { type CategoryResponse } from '../interfaces/category'

const initialState: Product = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: '',
  thumbnail: ''
}

export const useCreateProduct = () => {
  const [form, setForm] = useState<Product>(initialState)
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [isLoading, setIsLoading] = useState({
    createProduct: false,
    getCategories: true
  })
  const { createProductRequest, getCategoriesRequest } = useApi()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target

    if (name === 'thumbnail') {
      if (files && files.length > 0) {
        setForm({ ...form, thumbnail: files[0] })
      } else {
        setForm({ ...form, thumbnail: '' })
      }
    } else {
      setForm({
        ...form,
        [name]: value
      })
    }
  }

  const handleThumbnail = (file: File | string) => {
    setForm({ ...form, thumbnail: file })
  }

  const handleCategory = (category: string) => {
    setForm({ ...form, category })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsLoading({ ...isLoading, createProduct: true })
    await createProductRequest(form)
      .then((res) => {
        Toast('success', res.data.msg)
        setForm(initialState)
      })
      .catch((err) => {
        if (err.response.data.type === 'zod') {
          err.response.data.msg.map((msg: string) => Toast('error', msg))
        } else {
          Toast('error', err.response.data.msg)
        }
      })
      .finally(() => {
        setIsLoading({ ...isLoading, createProduct: false })
      })
  }

  const getCategories = async () => {
    await getCategoriesRequest()
      .then((res) => {
        setCategories(res.data)
      })
      .catch((err) => {
        Toast('error', err.response.data.msg)
      })
      .finally(() => {
        setIsLoading({ ...isLoading, getCategories: false })
      })
  }

  useEffect(() => {
    void getCategories()
  }, [])

  return {
    form,
    categories,
    isLoading,
    handleChange,
    handleSubmit,
    handleCategory,
    handleThumbnail
  }
}
