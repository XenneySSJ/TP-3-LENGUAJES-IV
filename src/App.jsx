import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";
import Servicios from "./pages/Servicios";
import ApiPage from "./pages/Api";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/api" element={<ApiPage />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
    </>
  );
}
