import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

interface Props {
  options?: string[]
  value?: string
  onChange?: (...args: any[]) => void
}

export const Select: React.FC<Props> = ({
  options = ['Opción 1', 'Opción 2', 'Opción 3'],
  value,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (option: string) => {
    onChange?.(option)
  }

  return (
    <section
      onClick={() => {
        setIsOpen((prev) => !prev)
      }}
      className="relative cursor-pointer px-3 py-2.5 w-full bg-transparent rounded-lg border-2 border-gray-400 outline-none focus:border-indigo-500 flex items-center gap-2"
    >
      <span className="grow select-none">
        {value == null || value === '' ? 'Elegir opción' : value}
      </span>
      <span className="text-gray-500 text-xl">
        <IoIosArrowDown />
      </span>
      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute overflow-hidden z-10 w-full bg-white rounded-lg border-2 border-gray-400 outline-none focus:border-indigo-500 left-0 top-[calc(100%_+_0.25em)]`}
      >
        {options?.map((option, index) => {
          return (
            <option
              key={index}
              value={option}
              onClick={(e) => {
                e.stopPropagation()
                handleChange(option)
                setIsOpen(false)
              }}
              className="cursor-pointer px-2 py-2 hover:bg-slate-200"
            >
              {option}
            </option>
          )
        })}
      </div>
    </section>
  )
}
