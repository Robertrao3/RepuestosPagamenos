import { useState, useEffect, useRef } from "react";
import { X, Upload, Trash2, Images, Camera } from "lucide-react";
import { supabase } from "../supabase";

const LABEL_OPTIONS = ["Frente", "Trasero", "Lateral", "Caja", "Marca", "Detalle", "Otro"];

export function ImageManagerModal({ product, onClose }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadLabel, setUploadLabel] = useState("Frente");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("product_images")
      .select("*")
      .eq("product_id", product.id)
      .order("sort_order", { ascending: true });
    setImages(data || []);
    setLoading(false);
  };

  const uploadFiles = async (fileList) => {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;
    setUploading(true);

    let currentOrder = images.length;
    for (const file of files) {
      const ext = file.name.split(".").pop().toLowerCase();
      const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const path = `${product.id}/${uniqueName}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from("product-images")
        .upload(path, file);

      if (!uploadErr) {
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(path);

        await supabase.from("product_images").insert({
          product_id: product.id,
          url: urlData.publicUrl,
          label: uploadLabel,
          sort_order: currentOrder,
        });
        currentOrder++;
      }
    }

    await fetchImages();
    setUploading(false);
  };

  const handleUpload = async (e) => {
    await uploadFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    uploadFiles(e.dataTransfer.files);
  };

  const handleDelete = async (img) => {
    const path = img.url.split("/product-images/")[1];
    if (path) {
      await supabase.storage.from("product-images").remove([path]);
    }
    await supabase.from("product_images").delete().eq("id", img.id);
    setImages((prev) => prev.filter((i) => i.id !== img.id));
    setDeleteConfirm(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 sm:px-4">
      <div className="bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl w-full sm:max-w-2xl h-[92vh] sm:h-auto sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start px-6 py-4 border-b shrink-0">
          <div>
            <h2 className="font-bold text-lg text-[#111111] flex items-center gap-2">
              <Images className="w-5 h-5 text-[#E05020]" />
              Imágenes del repuesto
            </h2>
            <p className="text-xs text-gray-400 font-mono mt-0.5">
              {product.id} — {product.nombre}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 mt-0.5">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5">
          {/* Upload area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-4 mb-5 transition-colors ${
              isDragging ? "border-[#E05020] bg-[#E05020]/5" : "border-gray-200 hover:border-[#E05020]/40"
            }`}
          >
            {/* Hidden inputs */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleUpload}
            />

            {/* Label selector */}
            <div className="mb-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">
                Etiqueta
              </label>
              <select
                value={uploadLabel}
                onChange={(e) => setUploadLabel(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E05020] focus:border-transparent"
              >
                {LABEL_OPTIONS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Upload buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => cameraInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center justify-center gap-2 border-2 border-[#E05020] text-[#E05020] px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[#E05020]/5 disabled:opacity-60 transition-colors"
              >
                <Camera className="w-4 h-4" />
                Tomar foto
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center justify-center gap-2 bg-[#E05020] text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-[#C94010] disabled:opacity-60 transition-colors"
              >
                <Upload className="w-4 h-4" />
                {uploading ? "Subiendo..." : "Galería"}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Puedes subir múltiples fotos desde la galería, o arrastrarlas aquí desde tu computadora. JPG, PNG o WebP.
            </p>
          </div>

          {/* Image grid */}
          {loading ? (
            <div className="text-center py-10 text-gray-400 text-sm">Cargando imágenes...</div>
          ) : images.length === 0 ? (
            <div className="text-center py-10">
              <Images className="w-14 h-14 mx-auto mb-3 text-gray-200" />
              <p className="text-sm font-medium text-gray-400">No hay imágenes aún</p>
              <p className="text-xs text-gray-300 mt-1">Sube la primera foto usando el área de arriba</p>
            </div>
          ) : (
            <>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {images.length} {images.length === 1 ? "imagen" : "imágenes"}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="group relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-square"
                  >
                    <img
                      src={img.url}
                      alt={img.label || product.nombre}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.parentElement.classList.add("bg-red-50");
                        e.target.style.display = "none";
                      }}
                    />

                    {img.label && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-1 font-medium">
                        {img.label}
                      </div>
                    )}

                    {/* Delete button */}
                    {deleteConfirm === img.id ? (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2 p-2">
                        <p className="text-white text-xs text-center font-semibold">¿Eliminar?</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleDelete(img)}
                            className="bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg font-semibold hover:bg-red-600"
                          >
                            Sí
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="bg-white text-gray-700 text-xs px-3 py-1.5 rounded-lg font-semibold hover:bg-gray-100"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(img.id)}
                        className="absolute top-1.5 right-1.5 bg-white/90 border border-gray-200 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:border-red-200 shadow-sm"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-gray-500 hover:text-red-500" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="px-6 py-4 border-t shrink-0 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
