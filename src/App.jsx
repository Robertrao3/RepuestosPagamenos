import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, LogOut, LayoutDashboard } from "lucide-react";
import { supabase } from "./supabase";

import { CartProvider, useCart } from "./context/CartContext";
import { CartDrawer } from "./components/CartDrawer";
import { VenezuelaFlag } from "./components/VenezuelaFlag";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL, CONTACT_EMAIL, WHATSAPP_URL } from "./constants/contact";

import HomePage from "./pages/HomePage";
const InventoryPage = lazy(() => import("./pages/InventoryPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RequestPage = lazy(() => import("./pages/RequestPage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const NAV_LINKS = [
  { to: "/", label: "Inicio" },
  { to: "/inventory", label: "Inventario" },
  { to: "/about", label: "Nosotros" },
  { to: "/contact", label: "Contacto" },
  { to: "/request", label: "Solicitar repuesto" },
];

function CartButton({ onClick }) {
  const { count } = useCart();
  return (
    <button
      onClick={onClick}
      aria-label="Abrir carrito"
      className="relative text-white/70 hover:text-[#E05020] transition-colors p-1"
    >
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-[#E05020] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async (session) => {
      if (!session?.user) { setLoggedIn(false); setIsAdmin(false); return; }
      setLoggedIn(true);
      const { data } = await supabase.from("profiles").select("role").eq("id", session.user.id).single();
      setIsAdmin(data?.role === "admin");
    };
    supabase.auth.getSession().then(({ data: { session } }) => checkUser(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => checkUser(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="font-sans min-h-screen flex flex-col bg-white">
      {/* HEADER */}
      <header className="bg-[#111111] text-white py-3 fixed w-full top-0 z-50 border-b border-white/5">
        <nav className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-8">
          <Link to="/" className="flex items-center gap-3 no-underline" onClick={() => setMenuOpen(false)}>
            <img
              src="/pagamenos-logo.png"
              alt="Repuestos Pagamenos C.A."
              className="h-9 w-9 rounded-full object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-[#E05020] font-bold text-base md:text-lg tracking-tight">
                Repuestos Pagamenos
              </span>
              <span className="text-white/40 text-[10px] tracking-widest uppercase">C.A.</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6 list-none text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-white/70 hover:text-[#E05020] transition-colors no-underline font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {!loggedIn && (
              <li>
                <Link to="/login" className="text-white/70 hover:text-[#E05020] transition-colors no-underline font-medium">
                  Acceso
                </Link>
              </li>
            )}
            {isAdmin && (
              <li>
                <Link to="/admin" className="flex items-center gap-1.5 text-white/70 hover:text-[#E05020] transition-colors no-underline font-medium">
                  <LayoutDashboard className="w-4 h-4" /> Admin
                </Link>
              </li>
            )}
            {loggedIn && (
              <li>
                <button onClick={handleLogout} className="flex items-center gap-1.5 text-white/50 hover:text-red-400 transition-colors font-medium">
                  <LogOut className="w-4 h-4" /> Salir
                </button>
              </li>
            )}
            <li>
              <CartButton onClick={() => setCartOpen(true)} />
            </li>
          </ul>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <CartButton onClick={() => setCartOpen(true)} />
            <button
              className="text-white/70 hover:text-white p-1"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden bg-[#111111] border-t border-white/10 px-4 pb-4 pt-2">
            <ul className="flex flex-col gap-0.5 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2.5 px-3 text-white/70 hover:text-[#E05020] hover:bg-white/5 rounded-lg transition-colors no-underline font-medium text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {!loggedIn && (
                <li>
                  <Link to="/login" onClick={() => setMenuOpen(false)}
                    className="block py-2.5 px-3 text-white/70 hover:text-[#E05020] hover:bg-white/5 rounded-lg transition-colors no-underline font-medium text-sm">
                    Acceso
                  </Link>
                </li>
              )}
              {isAdmin && (
                <li>
                  <Link to="/admin" onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-2.5 px-3 text-white/70 hover:text-[#E05020] hover:bg-white/5 rounded-lg transition-colors no-underline font-medium text-sm">
                    <LayoutDashboard className="w-4 h-4" /> Panel Admin
                  </Link>
                </li>
              )}
              {loggedIn && (
                <li>
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2 py-2.5 px-3 text-white/50 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors font-medium text-sm">
                    <LogOut className="w-4 h-4" /> Cerrar sesión
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </header>

      {/* MAIN */}
      <main className="flex-1 pt-14">
        <Suspense fallback={<div className="max-w-7xl mx-auto px-8 py-16 text-center text-gray-400">Cargando...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/request" element={<RequestPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#111111] text-white mt-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/pagamenos-logo.png" alt="Logo" className="h-8 w-8 rounded-full" />
              <span className="text-[#E05020] font-bold text-base">Repuestos Pagamenos C.A.</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              Más de 20 años distribuyendo repuestos de calidad en Venezuela.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <VenezuelaFlag />
              <span className="text-white/50 text-xs">Servicio a nivel nacional</span>
            </div>
          </div>

          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">Horario</p>
            <p className="text-white/60 text-sm">Lun – Vie: 8:00 AM – 5:00 PM</p>
            <p className="text-white/60 text-sm">Sábado: 8:00 AM – 1:30 PM</p>
            <p className="text-white/60 text-sm">Domingo: Cerrado</p>
          </div>

          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-3 font-semibold">Contacto</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="text-white/60 text-sm hover:text-[#25D366] transition-colors block font-medium">WhatsApp: {CONTACT_PHONE_DISPLAY}</a>
            <a href={`tel:${CONTACT_PHONE_TEL}`} className="text-white/60 text-sm hover:text-[#E05020] transition-colors block mt-0.5">Llamar: {CONTACT_PHONE_DISPLAY}</a>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-white/60 text-sm hover:text-[#E05020] transition-colors block mt-0.5">{CONTACT_EMAIL}</a>
            <p className="text-white/60 text-sm mt-2">Esq. Puente Soublette, Caracas</p>
          </div>
        </div>
        <div className="border-t border-white/10 text-center py-4 text-white/30 text-xs">
          © {new Date().getFullYear()} Repuestos Pagamenos C.A. — Venezuela. Todos los derechos reservados.
        </div>
      </footer>

      {/* Cart drawer */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppShell />
    </CartProvider>
  );
}

export default App;
