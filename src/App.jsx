import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import InventoryPage from "./pages/InventoryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Header fijo */}
      <header className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white py-4 fixed w-full top-0 z-50 shadow-lg">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-8">
          <div className="text-2xl md:text-3xl font-bold text-[#e94560]">
            Repuestos Pagamenos C.A.
          </div>
          <ul className="flex gap-4 md:gap-8 list-none text-sm md:text-base">
            <li>
              <Link
                to="/"
                className="text-white no-underline font-medium hover:text-[#e94560] transition-colors"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-white no-underline font-medium hover:text-[#e94560] transition-colors"
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link
                to="/inventory"
                className="text-white no-underline font-medium hover:text-[#e94560] transition-colors"
              >
                Inventario
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white no-underline font-medium hover:text-[#e94560] transition-colors"
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white no-underline font-medium hover:text-[#e94560] transition-colors"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Contenido principal (las páginas) */}
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-[#0f0f1e] text-white text-center py-6 mt-8">
        <p>
          &copy; 2025 Repuestos Pagamenos C.A. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}

export default App;

