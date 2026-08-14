import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { usePageTitle } from "../hooks/usePageTitle";

export default function LoginPage() {
  usePageTitle("Iniciar sesión");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single();
      navigate(profile?.role === "admin" ? "/admin" : "/inventory");
    } catch (err) {
      const msg = err.message?.includes("Invalid login credentials")
        ? "Correo o contraseña incorrectos."
        : "Ocurrió un error. Inténtalo de nuevo.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setInfo("");
    if (!email) {
      setError("Escribe tu correo para recuperar tu contraseña.");
      return;
    }
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
    if (resetError) {
      setError("No pudimos enviar el correo de recuperación.");
    } else {
      setInfo("Te hemos enviado un correo con instrucciones para restablecer tu contraseña.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-[#111111] text-white px-6 py-4 flex items-center gap-3">
          <img
            src="/pagamenos-logo.png"
            alt="Logo"
            className="h-8 w-8 rounded-full object-contain bg-white/10"
          />
          <div>
            <h1 className="text-lg font-bold">Repuestos Pagamenos C.A.</h1>
            <p className="text-xs text-white/70">
              Accede para guardar tus pedidos y consultas
            </p>
          </div>
        </div>

        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                {error}
              </div>
            )}
            {info && (
              <div className="text-sm text-green-700 bg-green-50 border border-green-200 px-3 py-2 rounded-lg">
                {info}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E05020] focus:border-transparent text-sm"
                placeholder="tu@correo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E05020] focus:border-transparent text-sm"
                placeholder="Tu contraseña"
              />
            </div>

            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs text-[#E05020] hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#E05020] text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-[#C94010] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Procesando..." : "Iniciar sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
