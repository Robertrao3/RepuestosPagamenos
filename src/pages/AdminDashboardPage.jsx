import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";
import { usePageTitle } from "../hooks/usePageTitle";

const STATUS_OPTIONS = {
  pendiente: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  en_proceso: { label: "En proceso", color: "bg-blue-100 text-blue-800" },
  contactado: { label: "Contactado", color: "bg-purple-100 text-purple-800" },
  completado: { label: "Completado", color: "bg-green-100 text-green-800" },
  cancelado: { label: "Cancelado", color: "bg-gray-100 text-gray-600" },
};

function StatusBadge({ status }) {
  const s = STATUS_OPTIONS[status] || STATUS_OPTIONS.pendiente;
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.color}`}>
      {s.label}
    </span>
  );
}

function StatusSelect({ value, onChange }) {
  return (
    <select
      value={value || "pendiente"}
      onChange={(e) => onChange(e.target.value)}
      className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-[#E05020] focus:border-transparent bg-white cursor-pointer"
    >
      {Object.entries(STATUS_OPTIONS).map(([val, { label }]) => (
        <option key={val} value={val}>{label}</option>
      ))}
    </select>
  );
}

function FilterBar({ current, onChange, counts }) {
  return (
    <div className="flex gap-2 mb-5 flex-wrap">
      <button
        onClick={() => onChange("all")}
        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
          current === "all" ? "bg-[#111111] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        Todas <span className="opacity-60 ml-1">{counts.all}</span>
      </button>
      {Object.entries(STATUS_OPTIONS).map(([val, { label }]) => (
        <button
          key={val}
          onClick={() => onChange(val)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
            current === val ? "bg-[#111111] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {label} <span className="opacity-60 ml-1">{counts[val] || 0}</span>
        </button>
      ))}
    </div>
  );
}

function formatDate(iso) {
  if (!iso) return "Sin fecha";
  return new Date(iso).toLocaleDateString("es-VE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function RequestsTab() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    supabase
      .from("requests")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRequests(data || []);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from("requests").update({ status }).eq("id", id);
    setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  const updateNotes = async (id, admin_notes) => {
    await supabase.from("requests").update({ admin_notes }).eq("id", id);
  };

  const filtered = filter === "all" ? requests : requests.filter((r) => r.status === filter);

  const counts = {
    all: requests.length,
    ...Object.keys(STATUS_OPTIONS).reduce((acc, s) => {
      acc[s] = requests.filter((r) => (r.status || "pendiente") === s).length;
      return acc;
    }, {}),
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-400">Cargando solicitudes...</div>;
  }

  return (
    <div>
      <FilterBar current={filter} onChange={setFilter} counts={counts} />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          {filter === "all"
            ? "No hay solicitudes todavía."
            : `No hay solicitudes con estado "${STATUS_OPTIONS[filter]?.label}".`}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((req) => (
            <div key={req.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                <div>
                  <p className="font-mono text-xs text-gray-400 mb-0.5">
                    {req.order_number || "Sin número de orden"}
                  </p>
                  <h3 className="font-bold text-[#111111] text-base">{req.nombre}</h3>
                  <a
                    href={`tel:${req.telefono}`}
                    className="text-[#E05020] text-sm font-medium hover:underline"
                  >
                    {req.telefono}
                  </a>
                </div>
                <StatusSelect
                  value={req.status}
                  onChange={(val) => updateStatus(req.id, val)}
                />
              </div>

              {req.vehiculo && (
                <div className="text-sm text-gray-600 mb-3">
                  <span className="font-medium text-gray-700">Vehículo: </span>
                  {req.vehiculo}
                </div>
              )}

              <div className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Repuesto solicitado
                </p>
                <p className="text-sm text-gray-800">{req.repuesto}</p>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Notas internas
                </label>
                <textarea
                  key={req.id}
                  defaultValue={req.admin_notes || ""}
                  onBlur={(e) => updateNotes(req.id, e.target.value)}
                  rows={2}
                  placeholder="Agrega notas solo visibles para el admin..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent resize-none"
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">{formatDate(req.created_at)}</span>
                <StatusBadge status={req.status || "pendiente"} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setOrders(data || []);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id, status) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const updateNotes = async (id, admin_notes) => {
    await supabase.from("orders").update({ admin_notes }).eq("id", id);
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const counts = {
    all: orders.length,
    ...Object.keys(STATUS_OPTIONS).reduce((acc, s) => {
      acc[s] = orders.filter((o) => (o.status || "pendiente") === s).length;
      return acc;
    }, {}),
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-400">Cargando pedidos...</div>;
  }

  return (
    <div>
      <FilterBar current={filter} onChange={setFilter} counts={counts} />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          {filter === "all"
            ? "No hay pedidos todavía."
            : `No hay pedidos con estado "${STATUS_OPTIONS[filter]?.label}".`}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                <div>
                  <p className="font-mono text-xs text-gray-400 mb-0.5">{order.order_number}</p>
                  <h3 className="font-bold text-[#111111] text-base">{order.nombre}</h3>
                  <a href={`tel:${order.telefono}`} className="text-[#E05020] text-sm font-medium hover:underline block">
                    {order.telefono}
                  </a>
                  {order.email && (
                    <a href={`mailto:${order.email}`} className="text-gray-400 text-xs hover:underline block mt-0.5">
                      {order.email}
                    </a>
                  )}
                  {order.vehiculo && (
                    <p className="text-gray-500 text-xs mt-0.5">🚗 {order.vehiculo}</p>
                  )}
                </div>
                <StatusSelect
                  value={order.status}
                  onChange={(val) => updateStatus(order.id, val)}
                />
              </div>

              <div className="mb-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Artículos solicitados ({(order.items || []).reduce((s, i) => s + i.qty, 0)} unidades)
                </p>
                <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100">
                  {(order.items || []).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center px-3 py-2.5">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{item.nombre}</p>
                        {item.aplicacion?.texto && (
                          <p className="text-xs text-gray-400 truncate">{item.aplicacion.texto}</p>
                        )}
                      </div>
                      <span className="text-sm font-bold text-[#111111] ml-3 shrink-0">
                        ×{item.qty}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Notas internas
                </label>
                <textarea
                  key={order.id}
                  defaultValue={order.admin_notes || ""}
                  onBlur={(e) => updateNotes(order.id, e.target.value)}
                  rows={2}
                  placeholder="Agrega notas solo visibles para el admin..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent resize-none"
                />
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-400">{formatDate(order.created_at)}</span>
                <StatusBadge status={order.status || "pendiente"} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  usePageTitle("Panel de Administración");
  const [tab, setTab] = useState("requests");
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session?.user) {
        navigate("/login");
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (data?.role === "admin") {
        setIsAdmin(true);
      } else {
        navigate("/");
      }
      setChecking(false);
    });
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center text-gray-400">
        Verificando acceso...
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50">
      <div className="bg-[#111111] px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
              <p className="text-white/50 text-sm mt-1">
                Gestiona solicitudes y pedidos recibidos de clientes
              </p>
            </div>
            <Link
              to="/"
              className="shrink-0 text-white/40 hover:text-white text-xs font-medium transition-colors no-underline mt-1"
            >
              ← Ver sitio
            </Link>
          </div>
        </div>
      </div>
      <div className="h-1 bg-[#E05020]" />

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            onClick={() => setTab("requests")}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
              tab === "requests"
                ? "border-[#E05020] text-[#E05020]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Solicitudes de repuestos
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
              tab === "orders"
                ? "border-[#E05020] text-[#E05020]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Pedidos del carrito
          </button>
        </div>

        {tab === "requests" ? <RequestsTab /> : <OrdersTab />}
      </div>
    </div>
  );
}
