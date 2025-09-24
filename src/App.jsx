import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Upload from "./pages/Upload";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>
    </>
  );
}
