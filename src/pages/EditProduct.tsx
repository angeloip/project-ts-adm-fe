import { useEffect, useState } from 'react'
import { Input } from '../components/Input'
import { UploadFile } from '../components/UploadFile'
import { useParams } from 'react-router-dom'
import { useApi } from '../api/useApi'
import { Toast } from '../helpers/toast'
import { type Product } from '../interfaces/product'
import { type CategoryResponse } from '../interfaces/category'
import { Select } from '../components/Select'

const initialState: Product = {
  name: '',
  description: '',
  price: 0,
  discountPercentage: 0,
  stock: 0,
  category: '',
  thumbnail: ''
}

export const EditProduct = () => {
  const [product, setProduct] = useState<Product>(initialState)
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const { id } = useParams()
  const {
    getProductRequest,
    updateProductRequest,
    updateProductPictureRequest,
    getCategoriesRequest
  } = useApi()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  const handleSubmitData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoadingData(true)
    const { thumbnail, ...rest } = product
    await updateProductRequest(id as string, rest)
      .then((res) => {
        Toast('success', res.data.msg)
      })
      .catch((err) => Toast('error', err.response.data.msg))
      .finally(() => {
        setIsLoadingData(false)
      })
  }

  const handleSubmitImage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (typeof product.thumbnail !== 'string') {
      setIsLoadingImage(true)
      await updateProductPictureRequest(id as string, product.thumbnail)
        .then((res) => {
          Toast('success', res.data.msg)
        })
        .catch((err) => Toast('error', err.response.data.msg))
        .finally(() => {
          setIsLoadingImage(false)
        })
    } else {
      Toast('error', 'No se ha seleccionado ninguna imagen')
    }
  }

  const getCategories = async () => {
    await getCategoriesRequest()
      .then((res) => {
        setCategories(res.data)
      })
      .catch((err) => {
        Toast('error', err.response.data.msg)
      })
  }

  const getProduct = async () => {
    await getProductRequest(id as string)
      .then(async (res) => {
        setProduct({
          ...res.data,
          category: res.data.category.name,
          thumbnail: res.data.thumbnail.url
        })
        await getCategories()
      })
      .catch((err) => Toast('error', err.response.data.msg))
      .finally(() => {
        setIsLoading(false)
      })
  }

  useEffect(() => {
    void getProduct()
  }, [id])

  return (
    <div className="component-box">
      <h1 className="text-3xl font-bold text-center mb-4">Edit Product</h1>
      {isLoading ? (
        <h1 className="text-3xl font-bold text-center mb-4">Cargando...</h1>
      ) : (
        <section className="flex flex-col gap-3">
          <form className="flex flex-col gap-3" onSubmit={handleSubmitData}>
            <Input
              text="Nombre"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
            <Input
              text="Descripción"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
            <Input
              type="number"
              text="Precio"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
            <Input
              type="number"
              text="Stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
            />
            <Select
              options={categories.map((category) => category.name)}
              value={product.category}
              onChange={(option) => {
                setProduct({ ...product, category: option })
              }}
            />
            <button
              className="button-primary"
              disabled={isLoadingData || isLoadingImage}
            >
              {isLoadingData ? 'Editando...' : 'Editar Información'}
            </button>
          </form>

          <form className="flex flex-col gap-3" onSubmit={handleSubmitImage}>
            <UploadFile
              isLoading={isLoading}
              value={product.thumbnail}
              onChange={(file) => {
                setProduct({ ...product, thumbnail: file })
              }}
            />
            <button
              className="button-primary"
              disabled={isLoadingImage || isLoadingData}
            >
              {isLoadingImage ? 'Editando...' : 'Editar Imagen'}
            </button>
          </form>
        </section>
      )}
    </div>
  )
}
