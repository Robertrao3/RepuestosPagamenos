// src/Inventory.jsx
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase"; // 👈 ya NO importamos auth ni AdminLogin

function Inventory({ enableAdmin = false, user = null }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailable, setFilterAvailable] = useState("all");

  // Cargar inventario desde Firestore
  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const snap = await getDocs(collection(db, "products"));
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      console.log("📦 Productos cargados desde Firestore:", items.length);
      setInventory(items);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!enableAdmin || !user) {
      alert("Solo un administrador autenticado puede eliminar productos.");
      return;
    }

    if (!window.confirm("¿Está seguro de eliminar este repuesto?")) return;

    try {
      await deleteDoc(doc(db, "products", id));
      setInventory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error al eliminar el producto");
    }
  };

  const toggleAvailability = async (item) => {
    if (!enableAdmin || !user) {
      alert("Solo un administrador autenticado puede cambiar la disponibilidad.");
      return;
    }

    try {
      await updateDoc(doc(db, "products", item.id), {
        disponible: !item.disponible,
      });
      setInventory((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, disponible: !p.disponible } : p
        )
      );
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Error al actualizar disponibilidad");
    }
  };

  const filteredInventory = inventory.filter((item) => {
    const term = searchTerm.trim().toLowerCase();
    const nombre = (item.nombre || "").toLowerCase();
    const codigo = (item.codigo || "").toLowerCase();
    const descripcion = (item.descripcion || "").toLowerCase();
    const aplicacionTexto = (item.aplicacion?.texto || "").toLowerCase();
    const equivalenciasText = Array.isArray(item.equivalencias)
      ? item.equivalencias.map((e) => e.toLowerCase())
      : [];

    const matchesSearch =
      term === "" ||
      nombre.includes(term) ||
      codigo.includes(term) ||
      descripcion.includes(term) ||
      aplicacionTexto.includes(term) ||
      equivalenciasText.some((eq) => eq.includes(term));

    const matchesAvailability =
      filterAvailable === "all"
        ? true
        : filterAvailable === "available"
        ? item.disponible === true
        : item.disponible === false;

    return matchesSearch && matchesAvailability;
  });

  const groupedByCategory = filteredInventory.reduce((acc, item) => {
    const category =
      item.categoria ||
      item.categoriaGrupo ||
      item.tipo ||
      "Otros repuestos";

    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const categoryNames = Object.keys(groupedByCategory).sort();

  if (loading) {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Cargando inventario...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h2 className="text-4xl font-bold mb-4 text-center text-[#1a1a2e]">
        Inventario en Línea
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Busca por nombre, código, descripción o aplicación.
      </p>

      {/* Search + filters */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Buscar por nombre, código, descripción, aplicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e94560] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterAvailable}
              onChange={(e) => setFilterAvailable(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e94560] focus:border-transparent"
            >
              <option value="all">Todos ({inventory.length})</option>
              <option value="available">
                Solo disponibles ({inventory.filter((i) => i.disponible).length})
              </option>
              <option value="unavailable">
                No disponibles ({inventory.filter((i) => !i.disponible).length})
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-[#e94560]">
            {inventory.length}
          </div>
          <div className="text-gray-600 text-sm">Total</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-green-600">
            {inventory.filter((i) => i.disponible).length}
          </div>
          <div className="text-gray-600 text-sm">Disponibles</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-red-600">
            {inventory.filter((i) => !i.disponible).length}
          </div>
          <div className="text-gray-600 text-sm">No disponibles</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg shadow text-center">
          <div className="text-3xl font-bold text-blue-600">
            {filteredInventory.length}
          </div>
          <div className="text-gray-600 text-sm">Mostrando</div>
        </div>
      </div>

      {/* Grouped sections */}
      {filteredInventory.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No se encontraron repuestos con los filtros aplicados.
        </p>
      ) : (
        categoryNames.map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-[#1a1a2e] border-b pb-2">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groupedByCategory[category].map((item) => (
                <div
                  key={item.id}
                  className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-l-4 ${
                    item.disponible ? "border-green-500" : "border-red-500"
                  }`}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-[#1a1a2e] mb-1">
                        {item.nombre || "Repuesto sin nombre"}
                      </h4>
                      <p className="text-xs text-gray-500 font-mono">
                        Código: {item.codigo || "N/D"}
                      </p>
                    </div>
                    {item.disponible ? (
                      <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ml-2">
                        ✓ Disponible
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ml-2">
                        ✗ Agotado
                      </span>
                    )}
                  </div>

                  {/* Application */}
                  {item.aplicacion && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-xs font-semibold text-gray-700 mb-1">
                        Aplicación:
                      </p>
                      <p className="text-xs text-gray-800">
                        {item.aplicacion.texto}
                      </p>
                      {item.aplicacion.modelo && (
                        <p className="text-xs text-gray-600 mt-1">
                          Modelo: {item.aplicacion.modelo}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Equivalencias */}
                  {Array.isArray(item.equivalencias) &&
                    item.equivalencias.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-700 mb-1">
                          Equivalencias:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.equivalencias.map((eq, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono"
                            >
                              {eq}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Description */}
                  {item.descripcion && (
                    <p className="text-xs text-gray-600 mb-4 line-clamp-2">
                      {item.descripcion}
                    </p>
                  )}

                  {/* Botones de ADMIN – solo si enableAdmin && user */}
                  {enableAdmin && user && (
                    <div className="flex gap-2 pt-3 border-t">
                      <button
                        onClick={() => toggleAvailability(item)}
                        className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${
                          item.disponible
                            ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                            : "bg-green-500 hover:bg-green-600 text-white"
                        }`}
                      >
                        {item.disponible
                          ? "Marcar agotado"
                          : "Marcar disponible"}
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-semibold"
                      >
                        🗑️ Borrar
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Inventory;
