import { FaEdit, FaTrash } from 'react-icons/fa'
import { type CategoryResponse } from '../interfaces/category'
import { useState, useEffect } from 'react'
import { useApi } from '../api/useApi'
import { Toast } from '../helpers/toast'
import { useVariable } from '../context/VariableContext'
import { CategoryModal } from './CategoryModal'

export const CategoryTable = () => {
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const { getCategoriesRequest, deleteCategoryRequest } = useApi()
  const { setIsLoadingBox } = useVariable()
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState({ id: '', name: '' })

  const getCategories = async () => {
    await getCategoriesRequest()
      .then((res) => {
        setCategories(res.data)
      })
      .catch((err) => {
        Toast('error', err.response.data.msg)
      })
  }

  const deleteCategory = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      setIsLoadingBox(true)
      await deleteCategoryRequest(id)
        .then((res) => {
          Toast('success', res.data.msg)
        })
        .catch((err) => {
          Toast('error', err.response.data.msg)
        })
        .finally(async () => {
          await getCategories()
          setIsLoadingBox(false)
        })
    }
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
                className={`${index === categories.length - 1
                  ? ''
                  : 'border-b  border-slate-200'
                  }`}
              >
                <td className="p-4">{element._id}</td>
                <td className="p-4">{element.name}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2 text-xl">
                    <button
                      onClick={() => {
                        void deleteCategory(element._id)
                      }}
                    >
                      <FaTrash className="text-red-600" />
                    </button>
                    <button onClick={() => { setCategory({ ...category, id: element._id, name: element.name }); setShow(true) }}>
                      <FaEdit className="text-yellow-500" />
                    </button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <CategoryModal show={show} setShow={setShow} value={category.name} id={category.id} isEdit />
    </section>
  )
}
