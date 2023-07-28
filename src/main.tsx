import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { VariableProvider } from './context/VariableContext.tsx'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VariableProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VariableProvider>
  </React.StrictMode>
)
