// src/pages/ServicesPage.jsx
export default function ServicesPage() {
  return (
    <section
      id="services"
      className="pt-24 pb-16 px-8 max-w-7xl mx-auto bg-gray-50 min-h-screen"
    >
      <h2 className="text-5xl font-bold mb-8 text-center text-[#1a1a2e]">
        Nuestros Servicios
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-transform">
          <h3 className="text-[#e94560] text-2xl font-semibold mb-4">
            Repuestos Originales
          </h3>
          <p className="text-gray-700">
            Repuestos originales de fabricante garantizados para ajustarse y
            funcionar perfectamente en su vehículo. Obtenemos directamente de
            proveedores confiables.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-transform">
          <h3 className="text-[#e94560] text-2xl font-semibold mb-4">
            Repuestos Alternativos
          </h3>
          <p className="text-gray-700">
            Alternativas de alta calidad que cumplen o superan los estándares
            originales a precios competitivos.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-transform">
          <h3 className="text-[#e94560] text-2xl font-semibold mb-4">
            Componentes del Motor
          </h3>
          <p className="text-gray-700">
            Gama completa de piezas de motor desde filtros hasta componentes
            principales. Orientación experta sobre selección y compatibilidad.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-transform">
          <h3 className="text-[#e94560] text-2xl font-semibold mb-4">
            Sistemas de Frenos
          </h3>
          <p className="text-gray-700">
            Pastillas de freno premium, discos, calipers y componentes completos
            del sistema de frenos para una potencia de frenado segura.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-transform">
          <h3 className="text-[#e94560] text-2xl font-semibold mb-4">
            Suspensión y Dirección
          </h3>
          <p className="text-gray-700">
            Inventario completo de componentes de suspensión y piezas de
            dirección para mantener su viaje suave y controlado.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-3 transition-transform">
          <h3 className="text-[#e94560] text-2xl font-semibold mb-4">
            Asesoría Técnica
          </h3>
          <p className="text-gray-700">
            Personal capacitado para ayudarle a encontrar exactamente la pieza
            correcta para su aplicación específica.
          </p>
        </div>
      </div>
    </section>
  );
}
