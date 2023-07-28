import { useEffect, useState } from 'react'
import { useApi } from '../api/useApi'
import { Toast } from '../helpers/toast'
import { type ProductResponse } from '../interfaces/product'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useVariable } from '../context/VariableContext'

export const ProductTable = () => {
  const [products, setProducts] = useState<ProductResponse[]>([])
  const { getProductsRequest, deleteProductRequest } = useApi()
  const { setIsLoadingBox } = useVariable()

  const deleteProduct = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setIsLoadingBox(true)
      await deleteProductRequest(id)
        .then((res) => {
          Toast('success', res.data.msg)
        })
        .catch((err) => Toast('error', err.response.data.msg))
        .finally(async () => {
          await getProducts()
          setIsLoadingBox(false)
        })
    }
  }

  const getProducts = async () => {
    await getProductsRequest()
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => Toast('error', err.response.data.msg))
  }

  useEffect(() => {
    void getProducts()
  }, [])

  return (
    <section className="p-4 border border-slate-200 rounded-xl shadow-md">
      <table className="w-full text-gray-500">
        <thead className="border-b border-slate-200">
          <tr>
            <th className="p-4 text-left">Id</th>
            <th className="p-4 text-left">Nombre</th>
            <th className="p-4 text-left">Categoría</th>
            <th className="p-4 text-left">Precio</th>
            <th className="p-4 text-left">Stock</th>
            <th className="p-4 text-left">Imagen</th>
            <th className="p-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((element, index) => {
            return (
              <tr
                key={element._id}
                className={`${
                  index === products.length - 1
                    ? ''
                    : 'border-b  border-slate-200'
                }`}
              >
                <td className="p-4">{element._id}</td>
                <td className="p-4">{element.name}</td>
                <td className="p-4">{element.category.name}</td>
                <td className="p-4">{element.price}</td>
                <td className="p-4">{element.stock}</td>
                <td className="p-4">
                  <img
                    className="w-10 h-10 shadow-md rounded-md object-cover"
                    src={element.thumbnail.url}
                    alt={element.name}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-xl">
                    <button
                      onClick={() => {
                        void deleteProduct(element._id)
                      }}
                    >
                      <FaTrash className="text-red-600" />
                    </button>
                    <Link to={`editar/${element._id}`}>
                      <FaEdit className="text-yellow-500" />
                    </Link>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}
