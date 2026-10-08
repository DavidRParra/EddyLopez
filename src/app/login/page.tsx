'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/apis/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.message || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Ocurrió un error al intentar iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center text-black px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-xl sm:max-w-2xl md:max-w-4xl p-8 sm:p-12 md:p-16 mt-[15vh] rounded-2xl shadow-xl mx-auto my-auto border border-gray-300 bg-white">
        
        {/* Título principal */}
        <h1 className="text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] font-extrabold mb-4 text-center ">
          Panel de Administración
        </h1>
        
        {/* Subtítulo */}
        <p className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] text-gray-600 mb-10 text-center ">
          Ingresa tus credenciales para administrar el contenido
        </p>

        {error && (
          <div className="mb-6 p-5 bg-red-500/10 border border-red-500 text-black text-[1.8rem] rounded-xl font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          <div>
            {/* Etiqueta de usuario */}
            <label className="block text-[1.4rem] sm:text-[1.6rem] font-semibold text-gray-800 mb-3">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-5 py-6 text-[1.4rem]! border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black shadow-sm"
              placeholder="Ej. eddy"
            />
          </div>

          <div>
            {/* Etiqueta de contraseña */}
            <label className="block text-[1.4rem] sm:text-[1.6rem] font-semibold text-gray-800 mb-3">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-6 text-[1.4rem]! border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black shadow-sm"
              placeholder="••••••••"
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 sm:py-5 px-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[2rem]! rounded-xl shadow-md transition-colors disabled:opacity-50"
          >
            {loading ? 'Verificando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </main>
  );
}