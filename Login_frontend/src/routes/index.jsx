// En tu archivo de enrutamiento principal
import { BrowserRouter as Router, Routes,    Link } from 'react-router-dom';

import Formulario from './Formulario';
import PaginaDestino from './PaginaDestino';

// link-to
function Rutas() {
  return (
    <Router>
      <Routes>
        <Router path="/formulario" element={<Formulario />} />
            <Router path="/destino/:userId" element={<PaginaDestino />} /> {/* Ejemplo con parámetros de ruta */}
      </Routes>
    </Router>
  );
}