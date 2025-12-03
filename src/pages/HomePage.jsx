// src/pages/HomePage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

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

  const scrollingBrands = [...brands, ...brands];

  // 🔎 Cuando escriben en el Home y presionan Enter → navegar al inventario filtrado
  function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;

    navigate(`/inventory?buscar=${encodeURIComponent(search.trim())}`);
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center text-white bg-gradient-to-br from-[#1a1a2e] to-[#16213e] relative px-4">
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Repuestos de Calidad Premium
          </h1>
          <p className="text-lg md:text-2xl mb-10 opacity-90">
            Encuentra el repuesto exacto para cualquier vehículo
          </p>

          {/* 🔎 SEARCH BAR */}
          <form
            onSubmit={handleSearch}
            className="flex items-center justify-center gap-2 w-full max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Buscar por nombre, código o modelo..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-black text-base shadow focus:ring-2 focus:ring-[#e94560] outline-none"
            />
            <button
              type="submit"
              className="bg-[#e94560] text-white font-medium px-5 py-3 rounded-lg hover:bg-[#d63651] transition-all"
            >
              Buscar
            </button>
          </form>

          {/* CTA */}
          <a
            href="/contact"
            className="inline-block bg-[#e94560] text-white px-10 py-4 rounded-full text-lg mt-8 hover:bg-[#d63651] hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            Solicitar Cotización
          </a>
        </div>
      </section>

      {/* BRANDS CAROUSEL */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="text-3xl font-bold text-center text-[#1a1a2e] mb-4">
            Marcas que distribuimos
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Representamos las marcas más confiables en suspensión, frenos,
            dirección, motor, correas y más.
          </p>

          <div className="relative overflow-hidden">
            <div className="brands-track">
              {scrollingBrands.map((brand, idx) => (
                <div
                  key={`${brand.name}-${idx}`}
                  className="w-32 h-20 md:w-36 md:h-24 bg-gray-50 rounded-xl shadow-sm border border-gray-200 flex items-center justify-center hover:shadow-md hover:-translate-y-1 transition-transform"
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
            Stock permanente y garantía de marcas líderes del mercado.
          </p>
        </div>
      </section>
    </>
  );
}

