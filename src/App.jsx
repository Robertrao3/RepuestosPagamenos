function App() {
  return (
    <div className="font-sans">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white py-4 fixed w-full top-0 z-50 shadow-lg">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-8">
          <div className="text-3xl font-bold text-[#e94560]">Repuestos Pagamenos C.A.</div>
          <ul className="flex gap-8 list-none">
            <li><a href="#home" className="text-white no-underline font-medium hover:text-[#e94560] transition-colors">Inicio</a></li>
            <li><a href="#services" className="text-white no-underline font-medium hover:text-[#e94560] transition-colors">Servicios</a></li>
            <li><a href="#about" className="text-white no-underline font-medium hover:text-[#e94560] transition-colors">Nosotros</a></li>
            <li><a href="#contact" className="text-white no-underline font-medium hover:text-[#e94560] transition-colors">Contacto</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center text-center text-white mt-16 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] relative">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">Repuestos de Calidad Premium</h1>
          <p className="text-2xl mb-8">Repuestos de calidad para cada vehículo, siempre</p>
          <a href="#contact" className="bg-[#e94560] text-white px-10 py-4 rounded-full text-lg inline-block no-underline hover:bg-[#d63651] hover:-translate-y-1 hover:shadow-xl transition-all">
            Solicitar Cotización
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-8 max-w-7xl mx-auto bg-gray-50">
        <h2 className="text-5xl font-bold mb-8 text-center text-[#1a1a2e]">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-transform">
            <h3 className="text-[#e94560] text-2xl font-semibold mb-4">Repuestos Originales</h3>
            <p className="text-gray-700">Repuestos originales de fabricante garantizados para ajustarse y funcionar perfectamente en su vehículo. Obtenemos directamente de proveedores confiables.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-transform">
            <h3 className="text-[#e94560] text-2xl font-semibold mb-4">Repuestos Alternativos</h3>
            <p className="text-gray-700">Alternativas de alta calidad que cumplen o superan los estándares originales a precios competitivos.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-transform">
            <h3 className="text-[#e94560] text-2xl font-semibold mb-4">Componentes del Motor</h3>
            <p className="text-gray-700">Gama completa de piezas de motor desde filtros hasta componentes principales. Orientación experta sobre selección y compatibilidad.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-transform">
            <h3 className="text-[#e94560] text-2xl font-semibold mb-4">Sistemas de Frenos</h3>
            <p className="text-gray-700">Pastillas de freno premium, discos, calipers y componentes completos del sistema de frenos para una potencia de frenado segura.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-transform">
            <h3 className="text-[#e94560] text-2xl font-semibold mb-4">Suspensión y Dirección</h3>
            <p className="text-gray-700">Inventario completo de componentes de suspensión y piezas de dirección para mantener su viaje suave y controlado.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-transform">
            <h3 className="text-[#e94560] text-2xl font-semibold mb-4">Asesoría Técnica</h3>
            <p className="text-gray-700">Personal capacitado para ayudarle a encontrar exactamente la pieza correcta para su aplicación específica.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-8 max-w-7xl mx-auto bg-white">
        <h2 className="text-5xl font-bold mb-8 text-center text-[#1a1a2e]">Sobre Nosotros</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="mb-4 text-lg text-gray-700">Con más de 20 años de experiencia en la industria de repuestos automotrices, hemos construido nuestra reputación en calidad, confiabilidad y servicio al cliente excepcional.</p>
            <p className="mb-4 text-lg text-gray-700">Nuestro extenso inventario incluye repuestos para todas las marcas y modelos de vehículos principales. Ya sea un mecánico profesional, taller de carrocería o entusiasta del bricolaje, tenemos las piezas que necesita.</p>
            <p className="text-lg text-gray-700">Nos enorgullecemos del conocimiento experto y el servicio personalizado. Nuestro equipo puede ayudarle a encontrar exactamente la pieza correcta para su aplicación específica.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-5xl font-bold text-[#e94560] mb-2">10.000</div>
              <p className="text-gray-700">Repuestos en Stock</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-5xl font-bold text-[#e94560] mb-2">20+</div>
              <p className="text-gray-700">Años de Experiencia</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <div className="text-5xl font-bold text-[#e94560] mb-2">10,000+</div>
              <p className="text-gray-700">Clientes Satisfechos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-8 max-w-7xl mx-auto bg-[#1a1a2e] text-white">
        <h2 className="text-5xl font-bold mb-8 text-center text-white">Contáctenos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="p-6 bg-white bg-opacity-10 rounded-xl">
            <h3 className="text-[#e94560] text-xl font-semibold mb-2">Teléfono</h3>
            <p className="mb-2">+58 412-6261061</p>
            <div className="mt-4 text-sm">
              <p className="font-semibold mb-2">Horario:</p>
              <p>Lunes: 8:00 AM - 5:00 PM</p>
              <p>Martes: 8:00 AM - 5:00 PM</p>
              <p>Miércoles: 8:00 AM - 5:00 PM</p>
              <p>Jueves: 8:00 AM - 5:00 PM</p>
              <p>Viernes: 8:00 AM - 5:00 PM</p>
              <p>Sábado: 8:00 AM - 1:30 PM</p>
              <p>Domingo: Cerrado</p>
            </div>
          </div>
          <div className="p-6 bg-white bg-opacity-10 rounded-xl">
            <h3 className="text-[#e94560] text-xl font-semibold mb-2">Email</h3>
            <p>info@repuestospagamenos.com</p>
            <p>ventas@repuestospagamenos.com</p>
          </div>
          <div className="p-6 bg-white bg-opacity-10 rounded-xl">
            <h3 className="text-[#e94560] text-xl font-semibold mb-2">Ubicación</h3>
            <p>Esq. Puente Soublette</p>
            <p>Edif. Salias y Soublette, PB</p>
            <p>Caracas 1014</p>
            <p>Distrito Capital, Venezuela</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0f1e] text-white text-center py-8">
        <p>&copy; 2025 Repuestos Pagamenos C.A. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default App