import { CgSpinner } from 'react-icons/cg'

interface Props {
  size?: number
  color?: string
}

export const Spinner: React.FC<Props> = ({ size, color }) => {
  return (
    <CgSpinner
      className="animate-spin"
      size={size}
      style={{ color: color ?? '#000' }}
    />
  )
}
