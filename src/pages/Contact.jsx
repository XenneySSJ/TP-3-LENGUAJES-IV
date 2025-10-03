import { useState } from "react";
import "../components/ui.css";

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [ok, setOk] = useState(false);
  const [errors, setErrors] = useState({});

  function validate(v){
    const e={};
    if(!v.name.trim()) e.name="El nombre es obligatorio";
    if(!v.email.trim()) e.email="El correo es obligatorio";
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email="Correo inválido";
    if(!v.message.trim()) e.message="El mensaje es obligatorio";
    return e;
  }

  function onSubmit(ev){
    ev.preventDefault();
    const e=validate(form);
    setErrors(e);
    if(Object.keys(e).length) return;

    // simulamos envío OK (si usás EmailJS, ponelo acá)
    setOk(true);
    setForm({ name:"", email:"", message:"" });
  }

  return (
    <div className="container">
      <div className="card grid-2">
        {/* FORM */}
        <form className="form" onSubmit={onSubmit} noValidate>
          <h2>Contacto</h2>
          {ok && <div className="okbox">Mensaje enviado correctamente ✅</div>}

          <div>
            <label>Nombre</label>
            <input
              className="input"
              value={form.name}
              onChange={e=>setForm({...form, name:e.target.value})}
            />
            {errors.name && <div className="error">{errors.name}</div>}
          </div>

          <div>
            <label>Dirección de Correo</label>
            <input
              className="input" type="email"
              value={form.email}
              onChange={e=>setForm({...form, email:e.target.value})}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>

          <div>
            <label>Mensaje</label>
            <textarea
              className="textarea" rows="5"
              value={form.message}
              onChange={e=>setForm({...form, message:e.target.value})}
            />
            {errors.message && <div className="error">{errors.message}</div>}
          </div>

          <button className="btn" type="submit">Enviar</button>
        </form>

        {/* MAPA */}
        <div>
          <h3>Ubicación</h3>
          <div className="map-wrap">
            <iframe
              title="Mapa"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.915142656002!2d-58.38159238504949!3d-34.6037344804596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac59e8fda5f%3A0xb4b0b2f8e2a67d!2sObelisco%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1672930000000!5m2!1ses!2sar"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <p style={{marginTop:8, opacity:.8}}>Podés cambiar la ubicación por la que quieras.</p>
        </div>
      </div>
    </div>
  );
}
