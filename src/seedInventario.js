// src/seedInventario.js
import inventario from "./data/Inv.json";
import { db } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export async function seedInventario() {
  const ref = collection(db, "products");

  console.log(
    "⏳ Subiendo inventario, espera... Esto puede tardar varios minutos."
  );

  let ok = 0;
  let skipped = 0;

  // Para no explotar el navegador, lo hacemos secuencialmente
  for (const item of inventario) {
    // Usamos item.id o item.codigo como base
    const rawId = item.id ?? item.codigo;

    if (!rawId) {
      console.warn("⛔ Item sin id/codigo, se omite:", item);
      skipped++;
      continue;
    }

    // Firestore no permite "/" en el id → lo reemplazamos por "_"
    const safeId = String(rawId).replace(/\//g, "_");

    try {
      await setDoc(doc(ref, safeId), item);
      ok++;
    } catch (e) {
      console.error("Error subiendo item con id:", rawId, e);
      skipped++;
    }
  }

  console.log(
    `✅ Inventario cargado. Documentos subidos: ${ok}. Elementos omitidos: ${skipped}.`
  );
}
