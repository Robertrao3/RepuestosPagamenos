// src/pages/HomePage.jsx

export default function HomePage() {
  const brands = [
    { name: "Moog", src: "/brands/moog.png" },
    { name: "Champion", src: "/brands/champion.png" },
    { name: "KYB", src: "/brands/kyb.png" },
    { name: "Gabriel", src: "/brands/gabriel.png" },
    { name: "LEVO", src: "/brands/levo.png" },
    { name: "Millard", src: "/brands/millard.png" },
    { name: "TRW", src: "/brands/trw.png" },
    { name: "555", src: "/brands/555.png" },
    { name: "Gates", src: "/brands/gates.png" },
  ];

  // Duplicamos la lista para que el carrusel pueda hacer loop suave
  const scrollingBrands = [...brands, ...brands];

  return (
    <>
      {/* Hero Section */}
      <section
        id="home"
        className="h-[calc(100vh-64px)] flex items-center justify-center text-center text-white bg-gradient-to-br from-[#1a1a2e] to-[#16213e] relative"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Repuestos de Calidad Premium
          </h1>
          <p className="text-lg md:text-2xl mb-8">
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

      {/* Brands Carousel Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#1a1a2e] mb-4">
            Marcas que distribuimos
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Trabajamos con marcas reconocidas a nivel mundial para garantizar
            la calidad y confiabilidad de cada repuesto que ofrecemos.
          </p>

          {/* Carrusel horizontal */}
          <div className="relative overflow-hidden">
            <div className="brands-track">
              {scrollingBrands.map((brand, idx) => (
                <div
                  key={`${brand.name}-${idx}`}
                  className="w-32 h-20 md:w-36 md:h-24 bg-gray-50 rounded-xl shadow-sm border border-gray-100 flex items-center justify-center hover:shadow-md hover:-translate-y-1 transition-transform"
                >
                  <img
                    src={brand.src}
                    alt={`Logo ${brand.name}`}
                    className="max-h-16 max-w-[80%] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Piezas de suspensión, frenos, dirección, motor y más respaldadas
            por marcas líderes del mercado.
          </p>
        </div>
      </section>
    </>
  );
}

