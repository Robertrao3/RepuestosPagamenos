import { usePageTitle } from "../hooks/usePageTitle";

const SERVICES = [
  {
    icon: "🔩",
    title: "Repuestos Originales",
    desc: "Repuestos OEM garantizados directamente de proveedores confiables. Ajuste y funcionamiento perfecto para su vehículo.",
  },
  {
    icon: "🛠️",
    title: "Repuestos Alternativos",
    desc: "Alternativas de alta calidad que cumplen o superan los estándares originales a precios más competitivos.",
  },
  {
    icon: "⚙️",
    title: "Componentes del Motor",
    desc: "Desde filtros hasta piezas principales de motor. Orientación experta en selección y compatibilidad.",
  },
  {
    icon: "🛑",
    title: "Sistemas de Frenos",
    desc: "Pastillas, discos, calipers y componentes completos del sistema de frenos para una frenada segura.",
  },
  {
    icon: "🛞",
    title: "Suspensión y Dirección",
    desc: "Inventario completo de amortiguadores, terminales, rótulas y más para mantener su vehículo controlado.",
  },
  {
    icon: "💬",
    title: "Asesoría Técnica",
    desc: "Nuestro equipo capacitado le ayuda a identificar exactamente la pieza correcta para su aplicación.",
  },
];

export default function ServicesPage() {
  usePageTitle("Servicios");
  return (
    <div className="min-h-screen bg-white">
      {/* Header banner */}
      <div className="bg-[#111111] px-4 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          Nuestros <span className="text-[#E05020]">Servicios</span>
        </h1>
        <p className="text-white/50 text-sm max-w-md mx-auto">
          Todo lo que necesitas para mantener tu vehículo en óptimas condiciones.
        </p>
      </div>
      <div className="h-1 bg-[#E05020]" />

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:border-[#E05020] hover:shadow-md transition-all group"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-[#E05020] transition-colors">
                {s.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
