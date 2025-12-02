// src/pages/ContactPage.jsx
export default function ContactPage() {
  return (
    <section
      id="contact"
      className="pt-24 pb-16 px-8 max-w-7xl mx-auto bg-[#1a1a2e] text-white min-h-screen"
    >
      <h2 className="text-5xl font-bold mb-8 text-center text-white">
        Contáctenos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="p-6 bg-white bg-opacity-10 rounded-xl">
          <h3 className="text-[#e94560] text-xl font-semibold mb-2">
            Teléfono
          </h3>
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
          <h3 className="text-[#e94560] text-xl font-semibold mb-2">
            Ubicación
          </h3>
          <p>Esq. Puente Soublette</p>
          <p>Edif. Salias y Soublette, PB</p>
          <p>Caracas 1014</p>
          <p>Distrito Capital, Venezuela</p>
        </div>
      </div>
    </section>
  );
}
