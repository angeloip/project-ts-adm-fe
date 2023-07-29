import { CategoryTable } from '../components/CategoryTable'
import { useState } from 'react'
import { CategoryModal } from '../components/CategoryModal'

export const Categories = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="component-box flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center">Categorías</h1>
      <button
        className="button-primary w-fit"
        onClick={() => {
          setShow(true)
        }}
      >
        Crear Categoría
      </button>
      <CategoryTable />
      <CategoryModal show={show} setShow={setShow} />
    </div>
  )
}
