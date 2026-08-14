import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("Página no encontrada");

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4 text-center bg-gray-50">
      <div className="text-9xl font-black text-[#E05020] mb-4 leading-none">404</div>
      <h1 className="text-2xl font-bold text-[#111111] mb-2">Página no encontrada</h1>
      <p className="text-gray-500 text-sm mb-8 max-w-sm">
        La página que buscas no existe o fue movida. Puedes volver al inicio o
        buscar directamente en el inventario.
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          to="/"
          className="bg-[#111111] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-black transition-colors no-underline"
        >
          Ir al inicio
        </Link>
        <Link
          to="/inventory"
          className="bg-[#E05020] text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-[#C94010] transition-colors no-underline"
        >
          Ver inventario
        </Link>
      </div>
    </div>
  );
}
