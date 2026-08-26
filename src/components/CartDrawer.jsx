import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { supabase } from "../supabase";
import { notifyOwner } from "../lib/notifyOwner";

function generateOrderNumber() {
  const d = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `PED-${d}-${rand}`;
}

export function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty, clearCart, count } = useCart();
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ nombre: "", telefono: "", email: "", vehiculo: "" });
  const [loading, setLoading] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setCheckout(false);
      setOrderNumber("");
      setForm({ nombre: "", telefono: "", email: "", vehiculo: "" });
      setError("");
    }
  }, [open]);

  const validatePhone = (tel) => /^(\+?58|0)(212|412|414|416|424|426)\d{7}$/.test(tel.replace(/[\s\-().]/g, ""));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validatePhone(form.telefono)) {
      setError("Ingresa un número venezolano válido. Ej: 0412-1234567");
      return;
    }
    setLoading(true);
    const order_number = generateOrderNumber();
    const { error: err } = await supabase.from("orders").insert({
      order_number,
      nombre: form.nombre,
      telefono: form.telefono,
      email: form.email || null,
      vehiculo: form.vehiculo || null,
      items,
      status: "pendiente",
    });
    if (err) {
      setError("Error al enviar el pedido. Intenta de nuevo.");
    } else {
      notifyOwner({
        subject: `Nuevo pedido — ${order_number}`,
        message: [
          `Pedido: ${order_number}`,
          `Nombre: ${form.nombre}`,
          `Teléfono: ${form.telefono}`,
          form.email && `Email: ${form.email}`,
          form.vehiculo && `Vehículo: ${form.vehiculo}`,
          `Artículos:`,
          ...items.map((i) => `- ${i.nombre} (${i.codigo || i.id}) ×${i.qty}`),
        ].filter(Boolean).join("\n"),
        replyTo: form.email,
        fromName: form.nombre,
      });
      setOrderNumber(order_number);
      clearCart();
    }
    setLoading(false);
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 bg-[#111111] text-white shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="font-bold text-lg">Mi Pedido</h2>
            {count > 0 && (
              <span className="bg-[#E05020] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {count}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Success state */}
        {orderNumber ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl">✅</span>
            </div>
            <h3 className="text-xl font-bold text-[#111111] mb-2">¡Pedido enviado!</h3>
            <p className="text-gray-500 text-sm mb-4">Tu número de seguimiento es:</p>
            <div className="bg-[#E05020]/10 border-2 border-[#E05020]/30 rounded-2xl px-8 py-4 mb-6">
              <span className="font-mono font-bold text-[#E05020] text-2xl tracking-wider">
                {orderNumber}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-8 max-w-xs">
              Guarda este número. Te contactaremos a la brevedad para confirmar y coordinar tu pedido.
            </p>
            <button
              onClick={onClose}
              className="bg-[#E05020] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#C94010] transition-colors"
            >
              Listo
            </button>
          </div>

        /* Empty cart */
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400">
            <ShoppingCart className="w-20 h-20 mb-4 opacity-10" />
            <p className="font-semibold text-gray-600">Tu pedido está vacío</p>
            <p className="text-sm mt-1">
              Agrega repuestos desde el inventario para solicitar cotización.
            </p>
            <button
              onClick={() => { onClose(); navigate("/inventory"); }}
              className="mt-6 bg-[#E05020] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#C94010] transition-colors"
            >
              Explorar inventario →
            </button>
          </div>

        /* Checkout form */
        ) : checkout ? (
          <div className="flex-1 overflow-y-auto p-5">
            <button
              onClick={() => setCheckout(false)}
              className="text-sm text-gray-500 hover:text-[#E05020] mb-4 flex items-center gap-1 font-medium"
            >
              ← Volver al pedido
            </button>
            <h3 className="font-bold text-[#111111] text-lg mb-1">Tus datos de contacto</h3>
            <p className="text-gray-500 text-sm mb-5">
              Los usaremos para comunicarnos y confirmar tu pedido.
            </p>

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
                  required
                  value={form.nombre}
                  onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))}
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={form.telefono}
                  onChange={(e) => setForm((p) => ({ ...p, telefono: e.target.value }))}
                  placeholder="Ej: 0412-1234567"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="Ej: juan@correo.com"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vehículo (marca, modelo, año)
                </label>
                <input
                  type="text"
                  value={form.vehiculo}
                  onChange={(e) => setForm((p) => ({ ...p, vehiculo: e.target.value }))}
                  placeholder="Ej: Toyota Corolla 2008"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent"
                />
              </div>

              {/* Order summary */}
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Resumen del pedido ({count} unidades)
                </p>
                <div className="space-y-1.5">
                  {items.map((i) => (
                    <div key={i.id} className="flex justify-between text-sm">
                      <span className="text-gray-700 truncate flex-1 pr-2">{i.nombre}</span>
                      <span className="text-gray-500 font-semibold shrink-0">×{i.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#E05020] text-white rounded-xl font-bold hover:bg-[#C94010] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Enviando..." : "Confirmar pedido"}
              </button>
            </form>
          </div>

        /* Items list */
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#111111] text-sm leading-tight">
                        {item.nombre}
                      </p>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">
                        {item.codigo || item.id}
                      </p>
                      {item.aplicacion?.texto && (
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {item.aplicacion.texto}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors shrink-0 mt-0.5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-bold w-5 text-center">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <span className="text-xs text-gray-400 ml-1">unidades</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 p-4 shrink-0 bg-white">
              <div className="flex justify-between text-sm mb-4 px-1">
                <span className="text-gray-500">Total de artículos</span>
                <span className="font-bold text-[#111111]">{count} unidades</span>
              </div>
              <button
                onClick={() => setCheckout(true)}
                className="w-full bg-[#E05020] text-white py-3.5 rounded-xl font-bold hover:bg-[#C94010] transition-colors text-sm"
              >
                Solicitar cotización →
              </button>
              <p className="text-center text-xs text-gray-400 mt-2">
                Te contactaremos para confirmar disponibilidad y precio
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
