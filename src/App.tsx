import { Routes, Route } from 'react-router-dom'
import { CreateProduct } from './pages/CreateProduct'
import { Home } from './pages/Home'
import { EditProduct } from './pages/EditProduct'
import { Navbar } from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Categories } from './pages/Categories'
import { useVariable } from './context/VariableContext'
import { BoxLoad } from './components/BoxLoad'

function App() {
  const { isLoadingBox } = useVariable()
  return (
    <>
      {isLoadingBox && <BoxLoad />}
      <ToastContainer pauseOnFocusLoss={false} theme="colored" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crear" element={<CreateProduct />} />
        <Route path="/editar/:id" element={<EditProduct />} />
        <Route path="/categorias" element={<Categories />} />
      </Routes>
    </>
  )
}

export default App
