import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <nav className="w-full h-[75px] shadow-md">
      <div className="h-full flex items-center justify-between px-5">
        <section>
          <h1 className="text-3xl font-bold">Project-TS-Adm</h1>
        </section>
        <section>
          <ul className="flex items-center gap-3">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/create">Crear</Link>
            </li>
          </ul>
        </section>
        <section className="flex gap-3">
          <button className="button-primary">Iniciar Sesión</button>
        </section>
      </div>
    </nav>
  )
}
