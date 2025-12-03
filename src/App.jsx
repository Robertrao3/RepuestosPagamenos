// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import InventoryPage from "./pages/InventoryPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// 🔥 NUEVO: Importar página del panel admin
import AdminInventoryPage from "./pages/AdminInventoryPage";

function App() {
  return (
    <div className="font-sans min-h-screen flex flex-col">

      {/* HEADER */}
      <header className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white py-4 fixed w-full top-0 z-50 shadow-lg">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-8">

          {/* LOGO + COMPANY NAME */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 no-underline">
              <img
                src="/pagamenos-logo.png"
                alt="Repuestos Pagamenos C.A. Logo"
                className="h-8 w-8 md:h-10 md:w-10 rounded-full object-contain bg-white/10"
              />
              <span className="text-2xl md:text-3xl font-bold text-[#e94560]">
                Repuestos Pagamenos C.A.
              </span>
            </Link>
          </div>

          {/* NAV LINKS */}
          <ul className="flex gap-4 md:gap-8 list-none text-sm md:text-base">
            <li>
              <Link
                to="/"
                className="text-white hover:text-[#e94560] transition-colors no-underline font-medium"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="text-white hover:text-[#e94560] transition-colors no-underline font-medium"
              >
                Servicios
              </Link>
            </li>
            <li>
              <Link
                to="/inventory"
                className="text-white hover:text-[#e94560] transition-colors no-underline font-medium"
              >
                Inventario
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-white hover:text-[#e94560] transition-colors no-underline font-medium"
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white hover:text-[#e94560] transition-colors no-underline font-medium"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* MAIN CONTENT (routes) */}
      <main className="flex-1 pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* 🔥 NUEVA RUTA: Panel del Administrador */}
          <Route path="/admin" element={<AdminInventoryPage />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0f0f1e] text-white text-center py-6 mt-8">
        <p>&copy; 2025 Repuestos Pagamenos C.A. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
