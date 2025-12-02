// src/pages/HomePage.jsx
export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="h-[calc(100vh-64px)] flex items-center justify-center text-center text-white bg-gradient-to-br from-[#1a1a2e] to-[#16213e] relative"
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Repuestos de Calidad Premium
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Repuestos de calidad para cada vehículo, siempre
          </p>
          <a
            href="/contact"
            className="bg-[#e94560] text-white px-10 py-4 rounded-full text-lg inline-block no-underline hover:bg-[#d63651] hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            Solicitar Cotización
          </a>
        </div>
      </section>
    </>
  );
}
