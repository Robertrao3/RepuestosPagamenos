import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "../supabase";
import Inventory from "../Inventory";

export default function InventoryPage() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);
  const [initialSearch, setInitialSearch] = useState("");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setInitialSearch(params.get("buscar") || "");
  }, [location.search]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      loadUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      loadUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUser = async (currentUser) => {
    setUser(currentUser);
    if (currentUser) {
      try {
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();
        setIsAdmin(data?.role === "admin");
      } catch {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
    setChecking(false);
  };

  if (checking) {
    return (
      <div className="max-w-7xl mx-auto px-8 py-16 text-center text-gray-600">
        Cargando inventario...
      </div>
    );
  }

  const params = new URLSearchParams(location.search);
  const initialCategory = params.get("categoria") || "";

  return (
    <Inventory enableAdmin={isAdmin} user={user} initialSearch={initialSearch} initialCategory={initialCategory} />
  );
}
