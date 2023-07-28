import { createContext, useContext, useState } from 'react'

interface State {
  isLoadingBox: boolean
  setIsLoadingBox: (value: boolean) => void
}

const VariableContext = createContext<State>({
  isLoadingBox: false,
  setIsLoadingBox: () => {}
})

export const useVariable = () => {
  const context = useContext(VariableContext)
  if (!context) throw new Error('There is not Auth Provider')
  return context
}

interface Props {
  children: React.ReactNode
}

export const VariableProvider: React.FC<Props> = ({ children }) => {
  const [isLoadingBox, setIsLoadingBox] = useState(false)

  const value = {
    isLoadingBox,
    setIsLoadingBox
  }

  return (
    <VariableContext.Provider value={value}>
      {children}
    </VariableContext.Provider>
  )
}
