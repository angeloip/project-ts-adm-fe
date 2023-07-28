import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

interface Props {
  options?: string[]
  value?: string
  onChange?: (option: string) => void
}

export const Select: React.FC<Props> = ({
  options = ['Opción 1', 'Opción 2', 'Opción 3'],
  value,
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const handleChange = (option: string) => {
    onChange?.(option)
  }

  const handleClickOutside = (event: MouseEvent): void => {
    if (
      selectRef.current != null &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div
      onClick={() => {
        setIsOpen((prev) => !prev)
      }}
      ref={selectRef}
      tabIndex={0}
      className="group relative px-3 py-2.5 flex items-center gap-2 cursor-pointer w-full bg-transparent rounded-lg border-2 border-gray-400 outline-none focus:border-indigo-500 duration-200"
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
        } absolute overflow-hidden z-10 w-full bg-white rounded-lg border-2 border-gray-400 outline-none left-0 top-[calc(100%_+_0.25em)]`}
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

      <span className="absolute top-0 left-[7px] text-[13px] bg-white -translate-y-1/2 select-none px-1 pointer-events-none text-gray-500 group-focus:text-indigo-500 duration-200">
        Categoría
      </span>
    </div>
  )
}
