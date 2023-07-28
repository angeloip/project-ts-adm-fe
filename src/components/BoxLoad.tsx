import { Spinner } from './Spinner'

export const BoxLoad = () => {
  return (
    <div className="fixed w-full min-h-screen flex items-center justify-center flex-col gap-4 bg-white/60 z-20">
      <Spinner size={60} />
      <span className="text-lg font-medium text-center">Espere ...</span>
    </div>
  )
}
