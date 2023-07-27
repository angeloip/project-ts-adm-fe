import { Modal } from './Modal'
import { FaXmark } from 'react-icons/fa6'

interface Props {
  show: boolean
  setShow: (show: boolean) => void
}

export const CreateCategory: React.FC<Props> = ({ show, setShow }) => {
  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false)
      }}
    >
      <div className="flex flex-col gap-4 px-4">
        <header className="flex items-center justify-between border-b-gray-300 pb-3 border-b">
          <h2 className="text-2xl font-bold">Creat Categoría</h2>
          <button
            className="text-3xl text-gray-500"
            onClick={() => {
              setShow(false)
            }}
          >
            <FaXmark />
          </button>
        </header>
      </div>
    </Modal>
  )
}
