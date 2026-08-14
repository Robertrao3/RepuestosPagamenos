import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { usePageTitle } from "../hooks/usePageTitle";

function generateOrderNumber() {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SOL-${d}-${rand}`;
}

export default function RequestPage() {
  usePageTitle("Solicitar repuesto");
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    email: "",
    vehiculo: "",
    repuesto: "",
  });
  const validatePhone = (tel) => /^(\+?58|0)(212|412|414|416|424|426)\d{7}$/.test(tel.replace(/[\s\-().]/g, ""));
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validatePhone(form.telefono)) {
      setError("Ingresa un número venezolano válido. Ej: 0412-1234567");
      return;
    }
    setLoading(true);
    const order_number = generateOrderNumber();
    const { error: err } = await supabase.from("requests").insert({
      ...form,
      order_number,
      status: "pendiente",
    });
    if (err) {
      setError("Ocurrió un error al enviar tu solicitud. Intenta de nuevo.");
    } else {
      setOrderNumber(order_number);
      setForm({ nombre: "", telefono: "", email: "", vehiculo: "", repuesto: "" });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] px-6 py-5">
            <h1 className="text-2xl font-bold text-white">Solicitar un repuesto</h1>
            <p className="text-white/70 text-sm mt-1">
              ¿No encontraste lo que buscabas? Déjanos tu solicitud y te contactamos.
            </p>
          </div>

          <div className="px-6 py-6">
            {orderNumber ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✅</span>
                </div>
                <h2 className="text-xl font-bold text-[#111111] mb-2">¡Solicitud enviada!</h2>
                <p className="text-gray-500 text-sm mb-3">
                  Recibimos tu solicitud. Tu número de seguimiento es:
                </p>
                <div className="bg-[#E05020]/10 border-2 border-[#E05020]/30 rounded-2xl px-6 py-3 inline-block mb-5">
                  <span className="font-mono font-bold text-[#E05020] text-xl tracking-wider">
                    {orderNumber}
                  </span>
                </div>
                <p className="text-gray-400 text-xs mb-6">Guarda este número para hacer seguimiento de tu solicitud.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => navigate("/")}
                    className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Volver al inicio
                  </button>
                  <button
                    onClick={() => navigate("/inventory")}
                    className="bg-[#111111] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#E05020] transition-colors"
                  >
                    Ver inventario
                  </button>
                  <button
                    onClick={() => setOrderNumber("")}
                    className="bg-[#E05020] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#C94010] transition-colors"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    required
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Juan Pérez"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E05020] focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    required
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="Ej: 0412-1234567"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E05020] focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Ej: juan@correo.com"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E05020] focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehículo (marca, modelo, año)
                  </label>
                  <input
                    type="text"
                    name="vehiculo"
                    value={form.vehiculo}
                    onChange={handleChange}
                    placeholder="Ej: Toyota Corolla 2005"
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E05020] focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Repuesto que necesitas <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="repuesto"
                    required
                    rows={3}
                    value={form.repuesto}
                    onChange={handleChange}
                    placeholder="Describe el repuesto que buscas, incluye código si lo tienes..."
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E05020] focus:border-transparent text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E05020] text-white font-semibold py-3 rounded-lg hover:bg-[#C94010] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Enviando..." : "Enviar solicitud"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
