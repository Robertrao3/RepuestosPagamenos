// src/pages/AdminInventoryPage.jsx
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Inventory from "../Inventory";
import AdminLogin from "../AdminLogin";

export default function AdminInventoryPage() {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setChecking(false);
    });
    return () => unsubscribe();
  }, []);

  if (checking) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-16 text-center text-gray-600">
        Cargando panel de administración...
      </div>
    );
  }

  if (!user) {
    // NO logueado → mostrar solo el formulario de login
    return (
      <div className="max-w-7xl mx-auto px-8 py-16">
        <h2 className="text-3xl font-bold mb-4 text-[#1a1a2e]">
          Panel de administración
        </h2>
        <p className="text-gray-600 mb-6">
          Inicia sesión como administrador para gestionar el inventario.
        </p>
        <AdminLogin user={user} />
      </div>
    );
  }

  // Logueado → mostrar inventario con controles de admin
  return (
    <div className="max-w-7xl mx-auto px-8 py-16">
      <h2 className="text-3xl font-bold mb-2 text-[#1a1a2e]">
        Panel de administración
      </h2>
      <p className="text-gray-600 mb-6">
        Sesión iniciada como <span className="font-semibold">{user.email}</span>
      </p>

      <Inventory enableAdmin={true} user={user} />
    </div>
  );
}
