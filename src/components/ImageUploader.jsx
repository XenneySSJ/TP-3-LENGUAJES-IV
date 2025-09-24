import { useState } from "react";
import "./ImageUploader.css";

export default function ImageUploader() {
  const [status, setStatus] = useState("Esperando archivo…");
  const [statusClass, setStatusClass] = useState("status");
  const [name, setName] = useState("—");
  const [type, setType] = useState("—");
  const [size, setSize] = useState("—");
  const [dims, setDims] = useState("—");
  const [previewSrc, setPreviewSrc] = useState("");

  function onChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setName(file.name);
    setType(file.type || "—");
    setSize((file.size / 1024).toFixed(1) + " KB");

    if (!file.type.startsWith("image/")) {
      setStatus("❌ No es una imagen");
      setStatusClass("status bad");
      setPreviewSrc("");
      setDims("—");
      return;
    }

    setStatus("✔ Imagen válida");
    setStatusClass("status ok");

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      setPreviewSrc(dataUrl);

      const img = new Image();
      img.onload = () => setDims(`${img.naturalWidth} × ${img.naturalHeight}px`);
      img.onerror = () => setDims("No se pudieron leer las dimensiones");
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }

  return (
    <main>
      <h1>Subí una imagen (File API)</h1>

      <div className="uploader">
        <p>Elegí una imagen desde tu PC:</p>
        <label htmlFor="file">Elegir archivo</label>
        <input id="file" type="file" accept="image/*" onChange={onChange} />
        <p className={statusClass}>{status}</p>
      </div>

      <div id="info">
        <p><b>Nombre:</b> <span>{name}</span></p>
        <p><b>Tipo:</b> <span>{type}</span></p>
        <p><b>Tamaño:</b> <span>{size}</span></p>
        <p><b>Dimensiones:</b> <span>{dims}</span></p>
      </div>

      {previewSrc && <img src={previewSrc} alt="Vista previa" />}
    </main>
  );
}
