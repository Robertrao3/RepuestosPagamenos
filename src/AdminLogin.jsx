// src/AdminLogin.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase';

function AdminLogin({ user, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      onLoginSuccess && onLoginSuccess();
    } catch (err) {
      setError('Email o contraseña incorrectos');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (user) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-green-800 font-medium">
              ✓ Sesión de administrador activa
            </p>
            <p className="text-xs text-green-600">{user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        🔒 Acceso de Administrador
      </h3>
      <p className="text-sm text-blue-700 mb-4">
        Inicia sesión para editar el inventario
      </p>
      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          placeholder="Email de administrador"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-300"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;