// src/pages/AboutPage.jsx

export default function AboutPage() {
  return (
    <section
      id="about"
      className="pt-24 pb-16 px-8 max-w-7xl mx-auto bg-gray-50 min-h-screen"
    >
      <h2 className="text-5xl font-bold mb-8 text-center text-[#1a1a2e]">
        Sobre Nosotros
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="mb-4 text-lg text-gray-700">
            Con más de 20 años de experiencia en la industria de repuestos
            automotrices, hemos construido nuestra reputación en calidad,
            confiabilidad y servicio al cliente excepcional.
          </p>

          <p className="mb-4 text-lg text-gray-700">
            Nuestro extenso inventario incluye repuestos para todas las
            marcas y modelos de vehículos principales. Ya sea un mecánico
            profesional, taller de carrocería o entusiasta del bricolaje,
            tenemos las piezas que necesita.
          </p>

          <p className="text-lg text-gray-700">
            Nos enorgullecemos del conocimiento experto y el servicio
            personalizado. Nuestro equipo puede ayudarle a encontrar la pieza
            correcta para su aplicación específica.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow">
            <div className="text-5xl font-bold text-[#e94560] mb-2">20k+</div>
            <p className="text-gray-700">Repuestos en Stock</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow">
            <div className="text-5xl font-bold text-[#e94560] mb-2">20+</div>
            <p className="text-gray-700">Años de Experiencia</p>
          </div>

          <div className="text-center p-6 bg-white rounded-xl shadow">
            <div className="text-5xl font-bold text-[#e94560] mb-2">50k+</div>
            <p className="text-gray-700">Clientes Satisfechos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
