import { useApi } from '../api/useApi'
import { Input } from './Input'
import { Modal } from './Modal'
import { FaXmark } from 'react-icons/fa6'
import { useState } from 'react'
import { Toast } from '../helpers/toast'

interface Props {
  show: boolean
  setShow: (show: boolean) => void
}

export const CreateCategory: React.FC<Props> = ({ show, setShow }) => {
  const { createCategoryRequest } = useApi()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name') as string
    if (!name.trim()) {
      Toast('error', 'El nombre es requerido')
      return
    }

    setIsLoading(true)
    await createCategoryRequest(name)
      .then((res) => {
        Toast('success', res.data.msg)
      })
      .catch((err) => {
        Toast('error', err.response.data.msg)
      })
      .finally(() => {
        setIsLoading(false)
        setShow(false)
        form.reset()
      })
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
    >
      <div className="flex flex-col gap-4 px-4">
        <header className="flex items-center justify-between border-b-gray-300 pb-3 border-b">
          <h2 className="text-2xl font-bold">Crear Categoría</h2>
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
            onSubmit={(e) => {
              void handleSubmit(e)
            }}
          >
            <Input text="Nombre" name="name" />
            <button
              type="submit"
              className="button-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Creando...' : 'Crear Categoría'}
            </button>
          </form>
        </main>
      </div>
    </Modal>
  )
}
