import { ProductTable } from '../components/ProductTable'

export const Home = () => {
  return (
    <div className="component-box">
      <h1 className="text-3xl font-bold text-center mb-4">Productos</h1>
      <ProductTable />
    </div>
  )
}
