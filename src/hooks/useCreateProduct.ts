import { useState } from 'react'
import { type Product } from '../interfaces/product'
import { useApi } from '../api/useApi'
import { Toast } from '../helpers/toast'

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
  const [isLoading, setIsLoading] = useState(false)
  const { createProductRequest } = useApi()

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
    setIsLoading(true)

    const isAnyFieldEmpty = Object.keys(form).some((key) => {
      const fieldValue = form[key as keyof Product]

      if (typeof fieldValue === 'string' || typeof fieldValue === 'number') {
        return fieldValue === '' || fieldValue.toString() === '0'
      }
      return false
    })
    console.log(form)
    if (isAnyFieldEmpty) {
      Toast('info', 'Todos los campos son requeridos')
    } else {
      await createProductRequest(form)
        .then((res) => {
          Toast('success', res.data.msg)
          setForm(initialState)
        })
        .catch((err) => {
          Toast('error', err.response.data.msg)
        })
    }
    setIsLoading(false)
  }

  return {
    form,
    isLoading,
    handleChange,
    handleSubmit,
    handleCategory,
    handleThumbnail
  }
}
