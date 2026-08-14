import { useState } from "react";
import { X, ShoppingCart, Check, ImageOff } from "lucide-react";
import { getCategory, getCategoryIcon } from "../categories";

export function ProductDetailModal({ product, images, onClose, onAddToCart, onImageClick }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const hasImages = Array.isArray(images) && images.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start px-6 py-4 border-b">
          <div>
            <h2 className="font-bold text-lg text-[#111111] leading-snug">{product.nombre || "Repuesto sin nombre"}</h2>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              {product.id}{product.codigo && product.codigo !== product.id ? ` · ${product.codigo}` : ""}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 shrink-0 mt-0.5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {hasImages ? (
            <div
              className="relative w-full h-56 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden cursor-zoom-in"
              onClick={() => onImageClick?.(0)}
            >
              <img
                src={images[0]}
                alt={product.nombre}
                className="w-full h-full object-contain p-2"
              />
              {images.length > 1 && (
                <span className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {images.length} fotos
                </span>
              )}
            </div>
          ) : (
            <div className="w-full h-40 rounded-xl bg-gray-50 border border-dashed border-gray-200 flex flex-col items-center justify-center gap-2">
              <ImageOff className="w-7 h-7 text-gray-300" />
              <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Imagen No Disponible</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Marca</p>
              <p className="text-gray-800">{product.marca || "No especificada"}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Categoría</p>
              <p className="text-gray-800 flex items-center gap-1">
                <span>{getCategoryIcon(getCategory(product.nombre))}</span> {getCategory(product.nombre)}
              </p>
            </div>
          </div>

          {(product.aplicacion?.texto || product.aplicacion?.modelo) && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Aplicación</p>
              <p className="text-sm text-gray-700">
                {product.aplicacion?.texto}
                {product.aplicacion?.modelo ? <span className="text-gray-400"> · Año {product.aplicacion.modelo}</span> : ""}
              </p>
            </div>
          )}

          {Array.isArray(product.equivalencias) && product.equivalencias.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">Equivalencias</p>
              <div className="flex flex-wrap gap-1.5">
                {product.equivalencias.map((eq, idx) => (
                  <span key={idx} className="text-xs bg-orange-50 text-orange-700 border border-orange-100 px-2 py-0.5 rounded font-mono font-medium">
                    {eq}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.descripcion && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Descripción</p>
              <p className="text-sm text-gray-600 leading-relaxed">{product.descripcion}</p>
            </div>
          )}

          <button
            onClick={handleAdd}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
              added ? "bg-green-500 text-white" : "bg-[#111111] text-white hover:bg-[#E05020]"
            }`}
          >
            {added ? (
              <><Check className="w-4 h-4" /> Agregado al pedido</>
            ) : (
              <><ShoppingCart className="w-4 h-4" /> Agregar al pedido</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
