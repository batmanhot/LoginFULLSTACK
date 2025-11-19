import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function PaginaDatos() {
  const { state } = useLocation();
  const { user } = state || {};
  const { msg } = state || {};


  if (!user) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <div className="p-8 rounded-lg shadow-lg bg-white text-center">
          <h2 className="text-xl font-semibold mb-4">No hay datos disponibles</h2>
          <Link to="/" className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Ir al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 rounded-lg shadow-lg bg-white text-center">
        <h2 className="text-xl font-semibold mb-4">{msg} 🎉</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Nombres:</strong> {user.nombres}</p>
        <p><strong>Apellidos:</strong> {user.apellidos}</p>

        <Link
          to="/"
          className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}
