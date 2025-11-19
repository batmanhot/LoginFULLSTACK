// Modal.jsx

import React from 'react';

// El componente recibe props como isOpen (para mostrar/ocultar), 
// onClose (la función para cerrar) y data (los parámetros a mostrar)
const Modal = ({ isOpen, onClose, title, message, user, extraData }) => {
  // Si no está abierto, no renderiza nada
  if (!isOpen) return null;

  return (
    // Fondo oscuro (Overlay)
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      
      {/* Contenedor del Diálogo */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full relative transform transition-all">
        
        {/* Botón de Cierre (esquina superior derecha) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition duration-150"
          aria-label="Cerrar"
        >
          {/* Icono de 'X' (puedes usar un icono de librería como Heroicons o un simple SVG) */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Contenido del Encabezado */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-b pb-2">
          {title || "Cuadro de Diálogo"}
        </h2>
        
        {/* Cuerpo del Diálogo con los Parámetros (Props) */}
        <div className="text-gray-700 dark:text-gray-300 space-y-3">
          
          <p className="font-semibold">{message || "Este es el contenido predeterminado del cuadro de diálogo."}</p>
          
          {user && (
            <p>
              **Usuario:** <span className="font-mono text-blue-600 dark:text-blue-400">{user}</span>
            </p>
          )}
          
          {extraData && (
            <p>
              **Dato Adicional:** <span className="font-mono bg-yellow-100 p-1 rounded text-sm text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">{extraData}</span>
            </p>
          )}

          {/* Puedes añadir más elementos basados en otras props que definas */}
          
        </div>

        {/* Pie de página (opcional) - Botón de Cierre Principal */}
        <div className="mt-6 pt-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 shadow-md"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};

export default Modal;