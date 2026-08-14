import { usePageTitle } from "../hooks/usePageTitle";

const HOURS = [
  { day: "Lunes – Viernes", hours: "8:00 AM – 5:00 PM" },
  { day: "Sábado", hours: "8:00 AM – 1:30 PM" },
  { day: "Domingo", hours: "Cerrado" },
];

export default function ContactPage() {
  usePageTitle("Contacto");
  return (
    <div className="min-h-screen bg-white">
      {/* Header banner */}
      <div className="bg-[#111111] px-4 py-12 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          <span className="text-[#E05020]">Contáctanos</span>
        </h1>
        <p className="text-white/50 text-sm max-w-md mx-auto">
          Estamos disponibles para atenderte y ayudarte a encontrar el repuesto que necesitas.
        </p>
      </div>
      <div className="h-1 bg-[#E05020]" />

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Phone */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="text-2xl mb-3">📞</div>
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">Teléfono</h3>
            <a href="tel:+584126261061" className="text-[#E05020] font-semibold text-lg hover:underline block">
              +58 412-6261061
            </a>
            <a href="https://wa.me/584126261061" target="_blank" rel="noreferrer" className="text-gray-400 text-xs mt-1 hover:text-green-600 transition-colors block">
              WhatsApp disponible →
            </a>
          </div>

          {/* Email */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="text-2xl mb-3">✉️</div>
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">Correo</h3>
            <a href="mailto:info@repuestospagamenos.com" className="text-gray-700 text-sm hover:text-[#E05020] transition-colors block">
              info@repuestospagamenos.com
            </a>
            <a href="mailto:ventas@repuestospagamenos.com" className="text-gray-700 text-sm hover:text-[#E05020] transition-colors block mt-1">
              ventas@repuestospagamenos.com
            </a>
          </div>

          {/* Location */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="text-2xl mb-3">📍</div>
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">Ubicación</h3>
            <p className="text-gray-700 text-sm">Esq. Puente Soublette</p>
            <p className="text-gray-700 text-sm">Edif. Salias y Soublette, PB</p>
            <p className="text-gray-700 text-sm">Caracas 1014, Venezuela</p>
          </div>
        </div>

        {/* Hours */}
        <div className="mt-6 border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-4">Horario de atención</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {HOURS.map((h) => (
              <div key={h.day} className="flex justify-between sm:flex-col gap-1">
                <span className="text-gray-500 text-sm">{h.day}</span>
                <span className={`text-sm font-semibold ${h.hours === "Cerrado" ? "text-red-400" : "text-[#E05020]"}`}>
                  {h.hours}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
