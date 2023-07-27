interface Props {
  type?: 'text' | 'password' | 'number'
  text?: string
  name?: string
  onChange?: (...args: any[]) => void
  value?: any
  readOnly?: boolean
}

export const Input: React.FC<Props> = ({
  type = 'text',
  text,
  name,
  onChange,
  value,
  readOnly
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        id="floating_outlined"
        className="input-dynamic px-3 py-2.5 w-full bg-transparent rounded-lg border-2 border-gray-400 outline-none focus:border-indigo-500 peer"
        placeholder=" "
        name={name}
        onChange={onChange}
        value={value}
        readOnly={readOnly}
        autoComplete="off"
      />
      <label
        htmlFor="floating_outlined"
        className="label-dynamic peer-focus:text-indigo-500 absolute left-2.5 top-[50%] -translate-y-1/2 select-none px-1 pointer-events-none text-gray-500
          bg-white"
      >
        {text}
      </label>
    </div>
  )
}
