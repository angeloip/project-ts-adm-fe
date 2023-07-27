import { type ToastOptions, toast } from 'react-toastify'

export const Toast = (type: string, msg: string) => {
  const options: ToastOptions = {
    autoClose: 3000,
    position: 'bottom-center'
  }
  if (type === 'success') {
    return toast.success(msg, options)
  }
  if (type === 'error') {
    return toast.error(msg, options)
  }
  if (type === 'info') {
    return toast.info(msg, options)
  }
  if (!type) {
    return toast(msg, options)
  }
}
