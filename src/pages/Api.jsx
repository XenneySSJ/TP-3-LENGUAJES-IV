import { useEffect, useState } from "react";
import "../components/ui.css";

const API = "https://api.frankfurter.app";

const CURRENCIES = ["USD", "EUR", "BRL"];
const FLAG_BY_CURRENCY = { USD: "us", EUR: "eu", BRL: "br" };
const flagURL = (code2) => `https://flagcdn.com/96x72/${code2}.png`;

function previousBusinessDate(d = new Date()) {
  const date = new Date(d);
  date.setDate(date.getDate() - 1);
  while ([0, 6].includes(date.getDay())) date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
}

export default function ApiPage() {
  const [rates, setRates] = useState(null);
  const [yRates, setYRates] = useState(null);
  const [status, setStatus] = useState("idle");

  async function load() {
    try {
      setStatus("loading");
      const r = await fetch(`${API}/latest?from=ARS&to=${CURRENCIES.join(",")}`);
      if (!r.ok) throw new Error();
      const j = await r.json();
      const prev = previousBusinessDate(new Date(j.date));
      const r2 = await fetch(`${API}/${prev}?from=ARS&to=${CURRENCIES.join(",")}`);
      const j2 = r2.ok ? await r2.json() : null;
      setRates(j.rates);
      setYRates(j2?.rates ?? null);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="container">
      <h2>API — Cotización del Peso Argentino</h2>
      <p style={{opacity:.85, marginTop:-6}}>
        Datos actualizados del Banco Central Europeo (frankfurter.app)
      </p>

      {status === "loading" && <div className="card">Cargando tipos de cambio…</div>}
      {status === "error" && <div className="card" style={{color:"#f87171"}}>Error al consultar la API.</div>}

      {rates && (
        <div className="rate-grid">
          {Object.entries(rates).map(([code, value]) => {
            const prev = yRates?.[code];
            const diff = prev ? ((value - prev) / prev) * 100 : null;
            const sign = diff == null ? "" : diff >= 0 ? "+" : "";
            const diffStr = diff == null ? "—" : `${sign}${diff.toFixed(2)}%`;

            return (
              <article key={code} className="rate-card">
                <img
                  src={flagURL(FLAG_BY_CURRENCY[code])}
                  alt={code}
                  className="rate-flag"
                />
                <div className="rate-body">
                  <h3>{code}</h3>
                  <ul className="api-list">
                    <li><b>1 ARS</b> = {value.toFixed(4)} {code}</li>
                    <li><b>Inverso:</b> {(1/value).toFixed(4)} ARS por {code}</li>
                    <li><b>Variación diaria:</b> {diffStr}</li>
                    <li><b>Fuente:</b> BCE (Frankfurter)</li>
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
