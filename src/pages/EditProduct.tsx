import { useEffect, useState } from 'react'
import { Input } from '../components/Input'
import { UploadFile } from '../components/UploadFile'
import { useParams } from 'react-router-dom'
import { useApi } from '../api/useApi'
import { Toast } from '../helpers/toast'
import { type Product } from '../interfaces/product'

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
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [isLoadingImage, setIsLoadingImage] = useState(false)
  const { id } = useParams()
  const {
    getProductRequest,
    updateProductRequest,
    updateProductPictureRequest
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

  const getProduct = async () => {
    await getProductRequest(id as string)
      .then((res) => {
        setProduct({ ...res.data, thumbnail: res.data.thumbnail.url })
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
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              void handleSubmitData(e)
            }}
          >
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
            <Input
              text="Categoría"
              name="category"
              value={product.category}
              onChange={handleChange}
            />

            <button
              className="button-primary"
              disabled={isLoadingData || isLoadingImage}
            >
              {isLoadingData ? 'Editando...' : 'Editar Información'}
            </button>
          </form>

          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => {
              void handleSubmitImage(e)
            }}
          >
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
