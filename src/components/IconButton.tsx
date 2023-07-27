import { useState } from 'react'

interface Props {
  icon?: JSX.Element
  text?: string
  onClick?: () => void
  hoverColor?: string
}

export const IconButton: React.FC<Props> = ({
  icon,
  text,
  onClick,
  hoverColor
}) => {
  const [hover, setHover] = useState(false)

  const mouseOver = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setHover(true)
  }
  const mouseOut = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setHover(false)
  }

  return (
    <button
      className="relative cursor-pointer p-3 bg-transparent rounded-full border-none outline-none flex items-center justify-center transition-all duration-300"
      onClick={onClick}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      style={{
        backgroundColor: hover ? hoverColor ?? '#f0f0f0' : ''
      }}
    >
      {icon}
      {text && <span className="">{text}</span>}
    </button>
  )
}
