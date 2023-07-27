import { MdDelete } from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { IconButton } from './IconButton'
import { useEffect, useRef, useState } from 'react'
import { Toast } from '../helpers/toast'

interface Props {
  isLoading?: boolean
  onChange?: (file: File | string) => void
  value?: string | File
}

export const UploadFile: React.FC<Props> = ({ isLoading, onChange, value }) => {
  const ref = useRef<null | HTMLDivElement>(null)
  const [image, setImage] = useState<string | null>(null)
  const [fileName, setFileName] = useState('Ningún archivo seleccionado')
  const [fileSize, setFileSize] = useState<string | null>(null)
  const formatTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

  const handleImage = (files: FileList) => {
    if (files && files.length > 0) {
      if (formatTypes.includes(files[0].type)) {
        onChange?.(files[0])
        setImage(URL.createObjectURL(files[0]))
        setFileName(files[0].name)
        files[0].size < 1024 * 1024
          ? setFileSize(`${(files[0].size / 1024).toFixed(2)} KB`)
          : setFileSize(`${(files[0].size / (1024 * 1024)).toFixed(2)} MB`)
      } else {
        Toast('error', 'Formato no permitido')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files && files.length > 0) {
      handleImage(files)
    }
  }

  const handleDragEnter = () => {
    ref.current?.classList.add('opacity-60')
  }
  const handleDragLeave = () => {
    ref.current?.classList.remove('opacity-60')
  }
  const handleDragOver = (e: any) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    ref.current?.classList.remove('opacity-60')
    const uploadedFiles = e.dataTransfer.files.length
    if (uploadedFiles > 1) {
      Toast('info', 'Cargar un solo archivo')
    } else {
      handleImage(e.dataTransfer.files)
    }
  }

  useEffect(() => {
    if (value) {
      setImage(value as string)
      setFileName(value as string)
    }
  }, [])

  return (
    <div className="max-w-[500px]">
      <div
        ref={ref}
        className={`flex items-center justify-center border-2 border-dashed border-gray-400 bg-gray-200 cursor-pointer rounded-lg pb-[60%] h-0 overflow-hidden relative w-full transition-opacity  ${
          image ? '' : 'hover:opacity-60'
        }`}
        onDragEnter={
          image ?? isLoading
            ? undefined
            : () => {
                handleDragEnter()
              }
        }
        onDragLeave={
          image ?? isLoading
            ? undefined
            : () => {
                handleDragLeave()
              }
        }
        onDragOver={
          image ?? isLoading
            ? undefined
            : (e) => {
                handleDragOver(e)
              }
        }
        onDrop={
          image ?? isLoading
            ? undefined
            : (e) => {
                handleDrop(e)
              }
        }
      >
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          {image ? (
            <img
              src={image}
              className="w-full h-full object-contain bg-gray-200"
              alt={fileName}
            />
          ) : (
            <>
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleChange}
                id="file"
                hidden
                disabled={isLoading}
              />
              <label
                htmlFor="file"
                className="[&>*]:pointer-events-none w-full h-full flex items-center justify-center flex-col gap-3 cursor-pointer transition-[background-color]"
              >
                <FaCloudUploadAlt color="#1475cf" size={60} />
                <p>Seleccionar archivo</p>
              </label>
            </>
          )}
        </div>
      </div>

      <section className="my-3 flex items-center justify-between gap-2 py-1 px-3 rounded-lg bg-gray-200">
        <div className="flex items-center gap-1 overflow-hidden">
          <div className="flex items-center justify-center py-3">
            <AiFillFileImage color="#1475cf" size={30} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="truncate">{fileName}</span>
            <span className="text-gray-600 text-xs">{fileSize}</span>
          </div>
        </div>
        {image && (
          <div className="flex items-center p-[5px]">
            <IconButton
              icon={<MdDelete color="#E2574" size={20} />}
              onClick={
                isLoading
                  ? undefined
                  : () => {
                      setFileName('Ningún archivo seleccionado')
                      setImage(null)
                      setFileSize(null)
                      onChange?.('')
                    }
              }
              hoverColor="#c6d4fa"
            />
          </div>
        )}
      </section>
    </div>
  )
}
