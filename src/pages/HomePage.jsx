import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { CATEGORY_MAP } from "../categories";
import { usePageTitle } from "../hooks/usePageTitle";

function CarSilhouette() {
  return (
    <svg
      viewBox="0 0 900 280"
      className="absolute right-0 bottom-0 w-[78%] md:w-[60%] opacity-[0.065] pointer-events-none select-none"
      fill="white"
      aria-hidden="true"
    >
      {/*
        Sedan profile (Toyota Corolla-like) — single closed path.
        Car faces LEFT. Front bumper at x≈82, rear at x≈782.
        Ground at y=262. Wheel arches are concave cutouts in the bottom edge.
        Front wheel: center (196, 210) r=52  →  arch x: 144–248
        Rear  wheel: center (678, 210) r=52  →  arch x: 626–730
      */}
      <path d="
        M 82,248
        Q 80,222 98,215
        L 172,205
        Q 300,194 355,158
        L 394,88
        Q 408,74 426,72
        L 570,72
        Q 586,72 601,86
        L 643,122
        Q 662,136 688,140
        L 728,140
        Q 748,142 762,156
        L 776,194
        Q 782,224 782,262
        L 730,262
        Q 678,150 626,262
        L 248,262
        Q 196,150 144,262
        L 82,262
        Q 80,258 82,248
        Z
      " />

      {/* Front wheel */}
      <circle cx="196" cy="210" r="52" />
      <circle cx="196" cy="210" r="28" fill="rgba(0,0,0,0.38)" />
      <circle cx="196" cy="210" r="10" fill="rgba(255,255,255,0.18)" />

      {/* Rear wheel */}
      <circle cx="678" cy="210" r="52" />
      <circle cx="678" cy="210" r="28" fill="rgba(0,0,0,0.38)" />
      <circle cx="678" cy="210" r="10" fill="rgba(255,255,255,0.18)" />

      {/* Headlight */}
      <rect x="84" y="218" width="38" height="11" rx="5" fill="rgba(255,255,255,0.5)" />
      {/* Taillight */}
      <rect x="766" y="158" width="14" height="30" rx="4" fill="rgba(224,80,32,0.7)" />
      {/* Door line */}
      <line x1="316" y1="96" x2="306" y2="228" stroke="rgba(0,0,0,0.18)" strokeWidth="2.5" />
      {/* Window glare strips */}
      <line x1="340" y1="102" x2="330" y2="148" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
      <line x1="468" y1="80" x2="468" y2="128" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
    </svg>
  );
}

function VenezuelaFlag() {
  return (
    <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-sm overflow-hidden shadow-sm shrink-0" aria-label="Bandera de Venezuela">
      <rect width="30" height="20" fill="#CF142B" />
      <rect width="30" height="13.33" fill="#00247D" />
      <rect width="30" height="6.67" fill="#CF142B" />
      <rect y="6.67" width="30" height="6.67" fill="#00247D" />
      <rect width="30" height="6.67" fill="#FFD100" />
      {/* Stars arc */}
      <g fill="white">
        {[0,1,2,3,4,5,6,7].map((i) => {
          const angle = (i * 360 / 8 - 90) * (Math.PI / 180);
          const cx = 15 + 4.5 * Math.cos(angle);
          const cy = 10 + 4.5 * Math.sin(angle);
          return <circle key={i} cx={cx} cy={cy} r="0.8" />;
        })}
      </g>
    </svg>
  );
}

export default function HomePage() {
  usePageTitle(null);
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

  function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/inventory?buscar=${encodeURIComponent(search.trim())}`);
  }

  return (
    <>
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        className="relative bg-[#0d0d0d] text-white overflow-hidden min-h-[480px] flex items-center"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 0% 100%, rgba(224,80,32,0.14) 0%, transparent 55%), radial-gradient(ellipse at 100% 0%, rgba(224,80,32,0.06) 0%, transparent 55%)",
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />

        {/* Car silhouette */}
        <CarSilhouette />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28 w-full">
          {/* Venezuela badge */}
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 text-xs font-medium px-3.5 py-1.5 rounded-full mb-7 backdrop-blur-sm">
            <VenezuelaFlag />
            <span>Servicio a nivel nacional · Venezuela</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-5 leading-[1.08] max-w-2xl tracking-tight">
            El repuesto que<br />
            <span className="text-[#E05020]">necesitas,</span><br />
            cuando lo necesitas.
          </h1>

          <p className="text-white/45 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
            Más de 20.000 repuestos disponibles. Busca por nombre, código o aplicación vehicular.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex w-full max-w-2xl shadow-2xl shadow-black/40 rounded-xl overflow-hidden">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Ej: amortiguador Monroe, KIT CARBURADOR, 309-S..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-4 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#E05020]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#E05020] text-white font-bold px-7 py-4 hover:bg-[#C94010] transition-colors text-sm whitespace-nowrap"
            >
              Buscar
            </button>
          </form>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-9">
            {[
              { n: "20.000+", l: "repuestos" },
              { n: "20+", l: "años de experiencia" },
              { n: "50.000+", l: "clientes atendidos" },
            ].map((s) => (
              <div key={s.l} className="flex items-baseline gap-1.5">
                <span className="text-[#E05020] font-black text-xl">{s.n}</span>
                <span className="text-white/35 text-sm">{s.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orange accent */}
      <div className="h-1 bg-gradient-to-r from-[#C94010] via-[#E05020] to-[#C94010]" />

      {/* ── CATEGORY GRID ──────────────────────────────────────── */}
      <section className="bg-gray-50 px-4 md:px-8 py-14">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] font-bold text-[#E05020] uppercase tracking-[0.18em] mb-1.5">
                Catálogo
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[#111111] tracking-tight">
                Explora por categoría
              </h2>
            </div>
            <button
              onClick={() => navigate("/inventory")}
              className="hidden sm:flex items-center gap-1.5 text-sm text-[#E05020] font-semibold hover:gap-3 transition-all"
            >
              Ver todo <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {CATEGORY_MAP.map((cat) => (
              <button
                key={cat.label}
                onClick={() => navigate(`/inventory?categoria=${encodeURIComponent(cat.label)}`)}
                className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 hover:border-[#E05020]/40 hover:shadow-lg transition-all text-center shadow-sm"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                  {cat.icon}
                </span>
                <span className="text-xs font-semibold text-gray-600 group-hover:text-[#E05020] transition-colors leading-tight">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("/inventory")}
            className="sm:hidden flex items-center gap-1.5 text-sm text-[#E05020] font-semibold mt-5"
          >
            Ver todo el catálogo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* ── WHY US ─────────────────────────────────────────────── */}
      <section className="bg-white px-4 md:px-8 py-14 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-[10px] font-bold text-[#E05020] uppercase tracking-[0.18em] mb-1.5 text-center">
            Por qué elegirnos
          </p>
          <h2 className="text-2xl font-black text-[#111111] text-center mb-8 tracking-tight">
            Más de 20 años siendo tu aliado
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: "🔍",
                title: "Búsqueda precisa",
                desc: "Encuentra tu repuesto por código, nombre de pieza o aplicación vehicular en segundos.",
              },
              {
                icon: "🚚",
                title: "Entrega en todo el país",
                desc: "Coordinamos despacho a cualquier estado de Venezuela. Rápido y seguro.",
              },
              {
                icon: "✅",
                title: "Calidad garantizada",
                desc: "Solo trabajamos con marcas certificadas. Cada repuesto cumple estándares de calidad.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-[#E05020]/20 hover:shadow-sm transition-all"
              >
                <span className="text-3xl shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-[#111111] mb-1.5 text-sm">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRANDS ─────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-10 px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-[10px] text-gray-400 uppercase tracking-[0.18em] font-bold mb-7">
            Marcas que distribuimos
          </p>
          <div className="relative overflow-hidden">
            <div className="brands-track">
              {[...brands, ...brands].map((brand, idx) => (
                <div
                  key={`${brand.name}-${idx}`}
                  className="w-28 h-16 bg-white rounded-xl border border-gray-100 shadow-sm flex items-center justify-center flex-shrink-0"
                >
                  <img
                    src={brand.src}
                    alt={brand.name}
                    className="max-h-10 max-w-[75%] object-contain opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ─────────────────────────────────────────── */}
      <section
        className="relative bg-[#111111] px-4 py-16 text-white text-center overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 120%, rgba(224,80,32,0.18) 0%, transparent 70%)",
        }}
      >
        <div className="relative z-10 max-w-xl mx-auto">
          <p className="text-[10px] font-bold text-[#E05020] uppercase tracking-[0.18em] mb-3">
            No encuentras tu pieza
          </p>
          <h2 className="text-2xl md:text-3xl font-black mb-3 tracking-tight">
            Solicítala y la conseguimos
          </h2>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            Déjanos tu solicitud con los datos del repuesto y del vehículo.<br />
            Nuestro equipo te contacta a la brevedad.
          </p>
          <button
            onClick={() => navigate("/request")}
            className="bg-[#E05020] text-white font-bold px-8 py-3.5 rounded-xl hover:bg-[#C94010] transition-colors text-sm"
          >
            Solicitar un repuesto →
          </button>
        </div>
      </section>
    </>
  );
}
