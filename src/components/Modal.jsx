import "./ui.css";

export default function Modal({ open, title="Mensaje", children, onClose }) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <h3>{title}</h3>
        <div className="modal-body">{children}</div>
        <button className="btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
