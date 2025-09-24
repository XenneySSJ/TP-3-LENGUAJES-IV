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
    setOk(true);                       // simulamos envío OK
    setForm({name:"",email:"",message:""});
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Contacto</h2>
        {ok && <div style={{background:"#1b3",padding:10,borderRadius:8,marginBottom:12}}>Mensaje enviado correctamente ✅</div>}
        <form onSubmit={onSubmit} style={{display:"grid", gap:12}}>
          <div>
            <label>Nombre</label><br/>
            <input className="input" style={{width:"100%", padding:10,borderRadius:8,border:"1px solid #444",background:"#111",color:"#eee"}}
                   value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
            {errors.name && <div style={{color:"#f87171"}}>{errors.name}</div>}
          </div>
          <div>
            <label>Dirección de Correo</label><br/>
            <input className="input" type="email" style={{width:"100%", padding:10,borderRadius:8,border:"1px solid #444",background:"#111",color:"#eee"}}
                   value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
            {errors.email && <div style={{color:"#f87171"}}>{errors.email}</div>}
          </div>
          <div>
            <label>Mensaje</label><br/>
            <textarea className="textarea" rows="5" style={{width:"100%", padding:10,borderRadius:8,border:"1px solid #444",background:"#111",color:"#eee"}}
                      value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>
            {errors.message && <div style={{color:"#f87171"}}>{errors.message}</div>}
          </div>
          <button className="btn" type="submit" style={{background:"#2563eb",color:"#fff",border:"none",padding:"10px 14px",borderRadius:8,cursor:"pointer"}}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
