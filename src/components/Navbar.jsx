import { Link, NavLink } from "react-router-dom";
import "./ui.css";

export default function Navbar() {
  return (
    <header className="nav">
      <Link to="/" className="brand">TP React</Link>
      <nav className="links">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
      </nav>
    </header>
  );
}
