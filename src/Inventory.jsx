import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Search, X, Plus, Pencil, ShoppingCart, Check, Images } from "lucide-react";
import { supabase } from "./supabase";
import { getCategory, getCategoryIcon } from "./categories";
import { useCart } from "./context/CartContext";
import { ImageManagerModal } from "./components/ImageManagerModal";

function normalizeText(str) {
  return (str || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

const EMPTY_FORM = {
  id: "",
  codigo: "",
  nombre: "",
  descripcion: "",
  aplicacion_texto: "",
  aplicacion_modelo: "",
  equivalencias: "",
};

function ProductModal({ item, onClose, onSave }) {
  const [form, setForm] = useState(
    item
      ? {
          id: item.id,
          codigo: item.codigo || "",
          nombre: item.nombre || "",
          descripcion: item.descripcion || "",
          aplicacion_texto: item.aplicacion?.texto || "",
          aplicacion_modelo: item.aplicacion?.modelo || "",
          equivalencias: (item.equivalencias || []).join(", "),
        }
      : EMPTY_FORM
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      id: form.id.trim(),
      codigo: form.codigo.trim(),
      nombre: form.nombre.trim(),
      descripcion: form.descripcion.trim(),
      aplicacion: {
        texto: form.aplicacion_texto.trim(),
        modelo: form.aplicacion_modelo.trim(),
        extra: null,
      },
      equivalencias: form.equivalencias
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean),
    };

    const { data, error: err } = item
      ? await supabase.from("products").update(payload).eq("id", item.id).select().single()
      : await supabase.from("products").insert(payload).select().single();

    if (err) {
      setError(err.message);
    } else {
      onSave(data, !!item);
      onClose();
    }
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="font-bold text-lg text-[#111111]">
            {item ? "Editar repuesto" : "Agregar repuesto"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Código *</label>
              <input name="id" required value={form.id} onChange={handleChange} disabled={!!item}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent disabled:bg-gray-100" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Código alterno</label>
              <input name="codigo" value={form.codigo} onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
            <input name="nombre" required value={form.nombre} onChange={handleChange}
              placeholder="Ej: KIT CARBURADOR"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Aplicación (vehículo)</label>
              <input name="aplicacion_texto" value={form.aplicacion_texto} onChange={handleChange}
                placeholder="Ej: FORD FIESTA 1600"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Modelo / Año</label>
              <input name="aplicacion_modelo" value={form.aplicacion_modelo} onChange={handleChange}
                placeholder="Ej: 2005-2010"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Equivalencias <span className="text-gray-400">(separadas por coma)</span>
            </label>
            <input name="equivalencias" value={form.equivalencias} onChange={handleChange}
              placeholder="Ej: 309-S, 10035, 5142-B"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent" />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
            <textarea name="descripcion" rows={2} value={form.descripcion} onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent resize-none" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 py-2.5 bg-[#E05020] text-white rounded-lg text-sm font-semibold hover:bg-[#C94010] disabled:opacity-70 transition-colors">
              {saving ? "Guardando..." : item ? "Guardar cambios" : "Agregar repuesto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Inventory({ enableAdmin = false, user = null, initialSearch = "", initialCategory = "" }) {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [expanded, setExpanded] = useState(() =>
    initialCategory ? new Set([initialCategory]) : new Set()
  );
  const [modalItem, setModalItem] = useState(undefined);
  const [imageProduct, setImageProduct] = useState(null);
  const [addedIds, setAddedIds] = useState(new Set());
  const [productImages, setProductImages] = useState({}); // id → string[] | null
  const [lightbox, setLightbox] = useState(null); // { urls: string[], idx: number }
  const { addItem } = useCart();

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((l) => l && ({ ...l, idx: (l.idx + 1) % l.urls.length }));
      if (e.key === "ArrowLeft") setLightbox((l) => l && ({ ...l, idx: (l.idx - 1 + l.urls.length) % l.urls.length }));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  const handleAddToCart = (product) => {
    addItem(product);
    setAddedIds((prev) => {
      const next = new Set(prev);
      next.add(product.id);
      setTimeout(() => setAddedIds((p) => { const n = new Set(p); n.delete(product.id); return n; }), 1500);
      return next;
    });
  };

  useEffect(() => { setSearchTerm(initialSearch); }, [initialSearch]);
  useEffect(() => { fetchInventory(); }, []);

  // Fetch all images for newly-visible products
  useEffect(() => {
    const visibleIds = filtered
      .filter((item) => isSearching || expanded.has(getCategory(item.nombre)))
      .map((item) => item.id)
      .filter((id) => !(id in productImages));

    if (!visibleIds.length) return;

    supabase
      .from("product_images")
      .select("product_id, url")
      .in("product_id", visibleIds)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        const map = {};
        // Pre-mark all queried ids as null (no images)
        visibleIds.forEach((id) => { map[id] = null; });
        // Group urls by product
        (data || []).forEach(({ product_id, url }) => {
          if (!map[product_id]) map[product_id] = [];
          map[product_id].push(url);
        });
        setProductImages((prev) => ({ ...prev, ...map }));
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, inventory, searchTerm]);

  const fetchInventory = async () => {
    const PAGE = 1000;
    try {
      const { data: firstPage, error, count } = await supabase
        .from("products")
        .select("*", { count: "exact" })
        .range(0, PAGE - 1);
      if (error) throw error;

      setInventory(firstPage || []);
      setLoading(false);

      const total = count ?? firstPage.length;
      if (total > firstPage.length) {
        const ranges = [];
        for (let from = PAGE; from < total; from += PAGE) {
          ranges.push([from, from + PAGE - 1]);
        }
        const results = await Promise.all(
          ranges.map(([from, to]) =>
            supabase.from("products").select("*").range(from, to)
          )
        );
        const rest = results.flatMap((r) => r.data || []);
        setInventory([...(firstPage || []), ...rest]);
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!enableAdmin || !user) return;
    if (!window.confirm("¿Está seguro de eliminar este repuesto?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = (saved, isEdit) => {
    if (isEdit) {
      setInventory((prev) => prev.map((p) => (p.id === saved.id ? saved : p)));
    } else {
      setInventory((prev) => [...prev, saved]);
    }
  };

  const toggleCategory = (cat) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(cat) ? next.delete(cat) : next.add(cat);
      return next;
    });
  };

  const isSearching = searchTerm.trim().length > 0;

  const filtered = isSearching
    ? (() => {
        const term = normalizeText(searchTerm.trim());
        return inventory.filter(
          (item) =>
            normalizeText(item.nombre).includes(term) ||
            normalizeText(item.codigo).includes(term) ||
            normalizeText(item.descripcion).includes(term) ||
            normalizeText(item.aplicacion?.texto).includes(term) ||
            (item.equivalencias || []).some((e) => normalizeText(e).includes(term))
        );
      })()
    : inventory;

  const grouped = filtered.reduce((acc, item) => {
    const cat = getCategory(item.nombre);
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const categoryNames = Object.keys(grouped).sort();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="h-8 bg-gray-100 rounded-xl w-48 mx-auto mb-3 animate-pulse" />
        <div className="h-4 bg-gray-100 rounded-xl w-72 mx-auto mb-10 animate-pulse" />
        <div className="h-14 bg-gray-100 rounded-2xl max-w-2xl mx-auto mb-10 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="p-5 rounded-xl border border-gray-100 bg-white animate-pulse flex flex-col gap-3">
              <div className="h-4 bg-gray-100 rounded w-3/4" />
              <div className="h-3 bg-gray-100 rounded w-1/4" />
              <div className="h-8 bg-gray-100 rounded w-full" />
              <div className="flex gap-1.5 mt-1">
                <div className="h-4 bg-gray-100 rounded w-12" />
                <div className="h-4 bg-gray-100 rounded w-10" />
              </div>
              <div className="h-7 bg-gray-100 rounded w-full mt-2 pt-2 border-t border-gray-50" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <h2 className="text-4xl font-bold mb-2 text-center text-[#111111]">
        Inventario en Línea
      </h2>
      <p className="text-gray-500 text-center mb-8">
        Busca por nombre, código o aplicación — o explora por categoría.
      </p>

      {/* Search bar */}
      <div className="relative max-w-2xl mx-auto mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="¿Qué repuesto estás buscando?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-10 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#E05020] focus:border-[#E05020] shadow-sm transition-all"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Stats + admin add button */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-gray-500">
        <span className="bg-white px-4 py-2 rounded-full shadow-sm border">
          <strong className="text-[#E05020]">{inventory.length}</strong> repuestos en catálogo
        </span>
        {isSearching && (
          <span className="bg-[#E05020] text-white px-4 py-2 rounded-full shadow-sm">
            <strong>{filtered.length}</strong> resultados para "{searchTerm}"
          </span>
        )}
        {enableAdmin && user && (
          <button
            onClick={() => setModalItem(null)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full shadow-sm hover:bg-green-700 transition-colors font-semibold"
          >
            <Plus className="w-4 h-4" /> Agregar repuesto
          </button>
        )}
      </div>

      {/* Category grid (only when not searching) */}
      {!isSearching && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
          {Object.entries(
            inventory.reduce((acc, item) => {
              const cat = getCategory(item.nombre);
              acc[cat] = (acc[cat] || 0) + 1;
              return acc;
            }, {})
          )
            .sort((a, b) => b[1] - a[1])
            .map(([cat, count]) => (
              <button
                key={cat}
                onClick={() => {
                  toggleCategory(cat);
                  setTimeout(() => {
                    document.getElementById(`cat-${cat}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 50);
                }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all hover:shadow-md ${
                  expanded.has(cat)
                    ? "border-[#E05020] bg-[#E05020]/5"
                    : "border-gray-200 bg-white hover:border-[#E05020]/50"
                }`}
              >
                <span className="text-3xl">{getCategoryIcon(cat)}</span>
                <span className="font-semibold text-[#111111] text-sm text-center leading-tight">{cat}</span>
                <span className="text-xs text-gray-500">{count} repuestos</span>
              </button>
            ))}
        </div>
      )}

      {isSearching && filtered.length === 0 && (
        <p className="text-center text-gray-500 py-10">
          No se encontraron repuestos para "{searchTerm}".
        </p>
      )}

      {/* Category accordions */}
      <div className="space-y-4">
        {categoryNames.map((cat) => {
          const items = grouped[cat];
          const isOpen = isSearching || expanded.has(cat);
          return (
            <div key={cat} id={`cat-${cat}`} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryIcon(cat)}</span>
                  <span className="font-bold text-[#111111] text-lg">{cat}</span>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                    {items.length} repuestos
                  </span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>

              {isOpen && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                    {items.map((item) => (
                      <div key={item.id} className="p-5 rounded-xl border border-gray-100 bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-200 flex flex-col shadow-sm">
                        {/* Image area — only shown once fetched */}
                        {item.id in productImages && (
                          productImages[item.id] === null ? (
                            /* No image uploaded */
                            <div className="w-full h-32 rounded-lg mb-3 bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center gap-1.5">
                              <span className="text-3xl opacity-20">{getCategoryIcon(getCategory(item.nombre))}</span>
                              <span className="text-[10px] text-gray-300 font-medium uppercase tracking-wider">Sin imagen</span>
                            </div>
                          ) : (
                            /* Has images — click to open lightbox */
                            <div
                              className="relative w-full h-32 rounded-lg mb-3 bg-gray-50 border border-gray-100 overflow-hidden cursor-zoom-in group"
                              onClick={() => setLightbox({ urls: productImages[item.id], idx: 0 })}
                            >
                              <img
                                src={productImages[item.id][0]}
                                alt={item.nombre}
                                className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => { e.target.style.display = "none"; }}
                              />
                              {productImages[item.id].length > 1 && (
                                <span className="absolute bottom-1.5 right-1.5 bg-black/50 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                  {productImages[item.id].length} fotos
                                </span>
                              )}
                            </div>
                          )
                        )}
                        <div className="flex justify-between items-start gap-2 mb-1.5">
                          <h4 className="font-bold text-[#111111] text-sm leading-snug flex-1">
                            {item.nombre || "Repuesto sin nombre"}
                          </h4>
                        </div>
                        <p className="text-[11px] text-gray-400 font-mono mb-3">
                          {item.id}{item.codigo && item.codigo !== item.id ? ` · ${item.codigo}` : ""}
                        </p>

                        {item.aplicacion?.texto && (
                          <div className="flex items-start gap-1.5 mb-2.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0 mt-0.5">App</span>
                            <p className="text-xs text-gray-600 leading-snug">
                              {item.aplicacion.texto}
                              {item.aplicacion.modelo ? <span className="text-gray-400"> · {item.aplicacion.modelo}</span> : ""}
                            </p>
                          </div>
                        )}

                        {Array.isArray(item.equivalencias) && item.equivalencias.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.equivalencias.map((eq, idx) => (
                              <span key={idx} className="text-[10px] bg-orange-50 text-orange-700 border border-orange-100 px-1.5 py-0.5 rounded font-mono font-medium">
                                {eq}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="mt-auto pt-3 border-t border-gray-100 space-y-1.5">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                              addedIds.has(item.id)
                                ? "bg-green-500 text-white scale-[0.98]"
                                : "bg-[#111111] text-white hover:bg-[#E05020]"
                            }`}
                          >
                            {addedIds.has(item.id) ? (
                              <><Check className="w-3 h-3" /> Agregado al pedido</>
                            ) : (
                              <><ShoppingCart className="w-3 h-3" /> Agregar al pedido</>
                            )}
                          </button>

                          {enableAdmin && user && (
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => setModalItem(item)}
                                className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-xs font-semibold transition-colors"
                              >
                                <Pencil className="w-3 h-3" /> Editar
                              </button>
                              <button
                                onClick={() => setImageProduct(item)}
                                className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-violet-500 text-white rounded-lg hover:bg-violet-600 text-xs font-semibold transition-colors"
                              >
                                <Images className="w-3 h-3" /> Fotos
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="flex items-center justify-center px-2.5 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-xs font-semibold transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add/Edit modal — modalItem===null means "add", object means "edit" */}
      {modalItem !== undefined && (
        <ProductModal
          item={modalItem}
          onClose={() => setModalItem(undefined)}
          onSave={handleSave}
        />
      )}

      {/* Image manager — admin only */}
      {imageProduct && (
        <ImageManagerModal
          product={imageProduct}
          onClose={() => setImageProduct(null)}
        />
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white"
            onClick={() => setLightbox(null)}
          >
            <X className="w-7 h-7" />
          </button>

          {/* Prev / Next */}
          {lightbox.urls.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white bg-black/30 rounded-full p-2"
                onClick={(e) => { e.stopPropagation(); setLightbox((l) => ({ ...l, idx: (l.idx - 1 + l.urls.length) % l.urls.length })); }}
              >
                <ChevronUp className="w-6 h-6 -rotate-90" />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white bg-black/30 rounded-full p-2"
                onClick={(e) => { e.stopPropagation(); setLightbox((l) => ({ ...l, idx: (l.idx + 1) % l.urls.length })); }}
              >
                <ChevronDown className="w-6 h-6 -rotate-90" />
              </button>
            </>
          )}

          <img
            src={lightbox.urls[lightbox.idx]}
            alt="Imagen del repuesto"
            className="max-h-[85vh] max-w-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {lightbox.urls.length > 1 && (
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {lightbox.urls.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightbox((l) => ({ ...l, idx: i })); }}
                  className={`w-2 h-2 rounded-full transition-colors ${i === lightbox.idx ? "bg-white" : "bg-white/30"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Inventory;
