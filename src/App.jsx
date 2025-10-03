import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";
import Servicios from "./pages/servicios"; 
export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/servicios" element={<Servicios />} />   
      </Routes>
    </>
  );
}
