import { servicios } from "../data/servicios";
import "../components/ui.css"; // reutilizamos estilos

export default function Servicios() {
  return (
    <div className="container">
      <h2>Servicios</h2>

      <div className="service-grid">
        {servicios.map(s => (
          <article key={s.id} className="service-card">
            <img src={s.imagen} alt={s.titulo} />
            <div className="service-body">
              <h3>{s.titulo}</h3>
              <p>{s.descripcion}</p>
              <p className="precio">${s.precio} / noche</p>
              <button className="btn">Reservar</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
