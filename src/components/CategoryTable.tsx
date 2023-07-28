import { FaEdit, FaTrash } from 'react-icons/fa'
import { type CategoryResponse } from '../interfaces/category'
import { useState, useEffect } from 'react'
import { useApi } from '../api/useApi'
import { Toast } from '../helpers/toast'

export const CategoryTable = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const { getCategoriesRequest } = useApi()

  const getCategories = async () => {
    await getCategoriesRequest()
      .then((res) => {
        setCategories(res.data)
      })
      .catch((err) => {
        Toast('error', err.response.data.msg)
      })
  }

  useEffect(() => {
    void getCategories()
  }, [])

  return (
    <section className="p-4 border border-slate-200 rounded-xl shadow-md">
      <table className="w-full text-gray-500">
        <thead className="border-b border-slate-200">
          <tr>
            <th className="p-4 text-left">Id</th>
            <th className="p-4 text-left">Nombre</th>
            <th className="p-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((element, index) => {
            return (
              <tr
                key={element._id}
                className={`${
                  index === categories.length - 1
                    ? ''
                    : ' border-b  border-slate-200'
                }`}
              >
                <td className="p-4">{element._id}</td>
                <td className="p-4">{element.name}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-xl">
                    <button
                    /* onClick={() => {
                      void deleteProduct(element._id)
                    }} */
                    >
                      <FaTrash className="text-red-600" />
                    </button>
                    <button>
                      <FaEdit className="text-yellow-500" />
                    </button>
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
