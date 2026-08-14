import { usePageTitle } from "../hooks/usePageTitle";

const STATS = [
  { value: "20.000+", label: "Repuestos en stock" },
  { value: "20+", label: "Años de experiencia" },
  { value: "50.000+", label: "Clientes satisfechos" },
];

export default function AboutPage() {
  usePageTitle("Nosotros");
  return (
    <div className="min-h-screen bg-white">
      {/* Header banner */}
      <div className="bg-[#111111] px-4 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          Sobre <span className="text-[#E05020]">Nosotros</span>
        </h1>
        <p className="text-white/50 text-sm max-w-md mx-auto">
          Más de dos décadas siendo el aliado de mecánicos y conductores en Venezuela.
        </p>
      </div>
      <div className="h-1 bg-[#E05020]" />

      {/* Stats strip */}
      <div className="bg-gray-50 border-b border-gray-200 py-8 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-extrabold text-[#E05020]">{s.value}</div>
              <div className="text-gray-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Quiénes somos</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Con más de 20 años de experiencia en la industria automotriz venezolana,
              hemos construido nuestra reputación sobre tres pilares: calidad, confiabilidad
              y servicio al cliente excepcional.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nuestro catálogo incluye más de 20.000 referencias para todas las marcas
              y modelos principales. Atendemos tanto a talleres mecánicos profesionales
              como a conductores particulares.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Nuestro equipo está capacitado para orientarte en la selección del repuesto
              correcto, evitando errores costosos de compatibilidad.
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">¿Por qué elegirnos?</h3>
            {[
              "Catálogo de +20.000 referencias actualizadas",
              "Marcas líderes: Moog, TRW, KYB, Gates, Monroe y más",
              "Asesoría técnica personalizada",
              "Atención de lunes a sábado",
              "Ubicados en el corazón de Caracas",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-[#E05020] font-bold text-sm mt-0.5">✓</span>
                <span className="text-gray-600 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
