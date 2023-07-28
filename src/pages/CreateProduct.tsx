import { Input } from '../components/Input'
import { Select } from '../components/Select'
import { UploadFile } from '../components/UploadFile'
import { useCreateProduct } from '../hooks/useCreateProduct'

export const CreateProduct = () => {
  const {
    form,
    categories,
    isLoading,
    handleChange,
    handleSubmit,
    handleCategory,
    handleThumbnail
  } = useCreateProduct()

  return (
    <div className="component-box">
      <h1 className="text-3xl font-bold text-center mb-4">Create Product</h1>
      {isLoading.getCategories ? (
        <h1 className="text-3xl font-bold text-center mb-4">Cargando...</h1>
      ) : (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input
            text="Nombre"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
          <Input
            text="Descripción"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          <Input
            type="number"
            text="Precio"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
          <Input
            type="number"
            text="Stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          />
          <Select
            options={categories.map((category) => category.name)}
            value={form.category}
            onChange={(option) => {
              handleCategory(option)
            }}
          />
          <UploadFile
            isLoading={isLoading.createProduct}
            value={form.thumbnail}
            onChange={(file) => {
              handleThumbnail(file)
            }}
          />
          <button className="button-primary" disabled={isLoading.createProduct}>
            {isLoading.createProduct ? 'Creando...' : 'Crear'}
          </button>
        </form>
      )}
    </div>
  )
}
