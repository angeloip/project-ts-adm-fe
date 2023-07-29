import { useApi } from '../api/useApi'
import { Input } from './Input'
import { Modal } from './Modal'
import { FaXmark } from 'react-icons/fa6'
import { useState, useEffect } from 'react'
import { Toast } from '../helpers/toast'

interface Props {
  show: boolean
  setShow: (show: boolean) => void
  isEdit?: boolean
  value?: string
  id?: string
}

export const CategoryModal: React.FC<Props> = ({
  show,
  setShow,
  isEdit,
  value,
  id
}) => {
  const { createCategoryRequest, updateCategoryRequest } = useApi()
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!category.trim()) {
      Toast('error', 'El nombre es requerido')
      return
    }

    setIsLoading(true)
    await createCategoryRequest(category)
      .then((res) => {
        Toast('success', res.data.msg)
      })
      .catch((err) => {
        Toast('error', err.response.data.msg)
      })
      .finally(() => {
        setIsLoading(false)
        setShow(false)
        setCategory('')
      })
  }

  const handleSubmitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!category.trim()) {
      Toast('error', 'El nombre es requerido')
      return
    }

    setIsLoading(true)
    await updateCategoryRequest(id as string, category)
      .then((res) => {
        Toast('success', res.data.msg)
      })
      .catch((err) => {
        Toast('error', err.response.data.msg)
      })
      .finally(() => {
        setIsLoading(false)
        setShow(false)
      })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value)
  }

  useEffect(() => {
    if (value) setCategory(value)
  }, [value])

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
    >
      <div className="flex flex-col gap-4 px-4">
        <header className="flex items-center justify-between border-b-gray-300 pb-3 border-b">
          <h2 className="text-2xl font-bold">
            {isEdit ? 'Editar Categoría' : 'Crear Categoría'}
          </h2>
          <button
            className="text-3xl text-gray-500"
            onClick={() => {
              setShow(false)
            }}
          >
            <FaXmark />
          </button>
        </header>
        <main>
          <form
            className="flex flex-col gap-4"
            onSubmit={isEdit ? handleSubmitUpdate : handleSubmit}
          >
            <Input text="Nombre" name="name" value={category} onChange={onChange} />
            <button
              type="submit"
              className="button-primary"
              disabled={isLoading}
            >
              {isEdit
                ? isLoading
                  ? 'Actualizando...'
                  : 'Actualizar Categoría'
                : isLoading
                  ? 'Creando...'
                  : 'Crear Categoría'}
            </button>
          </form>
        </main>
      </div>
    </Modal>
  )
}
