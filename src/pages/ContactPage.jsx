import { MessageCircle } from "lucide-react";
import { usePageTitle } from "../hooks/usePageTitle";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, CONTACT_EMAIL, WHATSAPP_URL } from "../constants/contact";

const HOURS = [
  { day: "Lunes – Viernes", hours: "8:00 AM – 5:00 PM" },
  { day: "Sábado", hours: "8:00 AM – 1:30 PM" },
  { day: "Domingo", hours: "Cerrado" },
];

// Keep in sync with the HOURS table above.
function isOpenNow() {
  const caracasNow = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Caracas" }));
  const day = caracasNow.getDay();
  const hour = caracasNow.getHours() + caracasNow.getMinutes() / 60;
  if (day === 0) return false;
  if (day === 6) return hour >= 8 && hour < 13.5;
  return hour >= 8 && hour < 17;
}

export default function ContactPage() {
  usePageTitle("Contacto");
  const open = isOpenNow();

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
        {/* WhatsApp CTA */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1ebe5a] text-white font-bold text-lg py-5 rounded-2xl shadow-lg shadow-[#25D366]/20 transition-colors mb-3"
        >
          <MessageCircle className="w-6 h-6" />
          Escríbenos por WhatsApp
        </a>
        <p className="text-center text-xs text-gray-400 mb-8">
          {open
            ? "🟢 Abierto ahora — respuesta rápida"
            : "🔴 Fuera de horario — te responderemos apenas abramos"}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Phone */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="text-2xl mb-3">📞</div>
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">Teléfono</h3>
            <a href={`tel:${CONTACT_PHONE_TEL}`} className="text-[#E05020] font-semibold text-lg hover:underline block">
              {CONTACT_PHONE_DISPLAY}
            </a>
          </div>

          {/* Email */}
          <div className="border border-gray-200 rounded-xl p-6">
            <div className="text-2xl mb-3">✉️</div>
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">Correo</h3>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-700 text-sm hover:text-[#E05020] transition-colors block break-all">
              {CONTACT_EMAIL}
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
