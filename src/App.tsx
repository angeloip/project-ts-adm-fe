import { Routes, Route } from 'react-router-dom'
import { CreateProduct } from './pages/CreateProduct'
import { Home } from './pages/Home'
import { EditProduct } from './pages/EditProduct'
import { Navbar } from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer pauseOnFocusLoss={false} theme="colored" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </>
  )
}

export default App
