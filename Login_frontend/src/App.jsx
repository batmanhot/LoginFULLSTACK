import { useState } from 'react'
import './App.css'
import Login from './components/login.jsx'
import CrearCuenta from './components/crearcuenta_login.jsx'
import OlvidarCuenta from './components/olvidarcuenta_login.jsx'
import NuevaContrasena from './components/nuevacontraseña_login.jsx'
import PaginaError from './components/paginaError.jsx'
import Dashboard from './components/dashboard.jsx'
import VerifyEmail from './components/VerifyEmail.jsx'
import ValidaEmail from './components/ValidaEmail.jsx'
// import VrifyEmail from './components/VerifyEmail.jsx'
import PaginaDatos from './components/paginaDatos.jsx'
import PaginaDatosFinal from './components/paginaDatosxxx.jsx'

import { Routes, Route } from 'react-router-dom'
import cors from 'cors'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route path="/olvidar-cuenta" element={<OlvidarCuenta />} />
        {/* <Route path="/datosAceptados" element={<PaginaDatos />} /> */}
        <Route path="/datosAceptados" element={<PaginaDatosFinal />} />      
        <Route path="/nuevacontrasena/:token" element={<NuevaContrasena />} />
        <Route path="/dashboard" element={<Dashboard />} />      
        {/* <Route path="/verify/:token" element={<VerifyEmail />} /> */}
        <Route path="/verify/:token" element={<ValidaEmail />} />
        <Route path="*" element={<PaginaError />} />
      </Routes> 
    </>
  )
}

export default App
