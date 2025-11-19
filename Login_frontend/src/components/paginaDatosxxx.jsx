import React from 'react';

import { loginIMG, FaHome, MdEmail, FaTimesCircle, MdVerifiedUser, FaUserCheck, FaUserTie }  from "../assets/index.js";
import { useLocation, Link } from 'react-router-dom';

export default function PaginaDatosFinal() {

   const { state } = useLocation();
    const { user } = state || {};
    const { msg }  = state || {};
    const { subtitulo }  = state || {};

    //  console.log('Estado ...',state)
    //  console.log(state.user)
    //  console.log(state.msg)
    //  console.log(state.subtitulo)

    if (!user) {
      return (
       <div className='w-screen h-screen flex items-center justify-center'>
          <div className="w-full max-w-max flex items-center justify-center text-[rgb(31,41,55)] bg-gray-100 rounded-lg">

            <div className="w-full max-w-max p-8 rounded-lg shadow-lg">          
              <div className='flex justify-between items-center mb-2'>

                <div className="flex justify-start items-center">
                  <MdVerifiedUser size={20} className='text-red-600 mr-2'/>          
                  <h2 className="text-lg font-semibold mr-5">CENTRO DE VERIFICACION DE CUENTAS</h2>    
                </div>

                  <div className="flex justify-end items-center">
                    <img src={loginIMG} alt="Falcon" className="h-8 mr-2" />                       
                  </div>
        
              </div>
              
              <div className="border-1 border-double border-gray-400 mt-3 mb-3">
                  <div className="flex items-center justify-center">                    
                    <FaTimesCircle size={50} className="text-red-600 mb-2 mt-2" />                
                  </div> 

                  <h2 className="text-lg font-semibold text-center mb-4 pl-10 pr-10">😫 No hay datos disponibles</h2>                    
                 

                  {/* <span className='block text-sm font-bold text-blue-700 mb-1 text-center'>{subtitulo ? subtitulo : 'No se muestra nada'  }</span> */}
              </div> 
              { /* -- BOTON GRABAR DATOS -- */}                      
                <Link
                  to="/"              
                  rel="noopener noreferrer"
                  
                  className="w-full text-gray-800 py-2 rounded-lg flex items-center justify-center shadow-md border border-gray-300
                  hover:bg-blue-500 hover:text-white transition-colors duration-200 hover:outline-none hover:ring-2 hover:ring-blue-500"
                >
                  <FaHome size={20} className="mr-2"/>
                  Inicio
                </Link>                        
            </div>
          </div>
        </div>

      );
    }

  
  return (

    <div className='w-screen h-screen flex items-center justify-center'>

      <div className="w-full max-w-max flex items-center justify-center text-[rgb(31,41,55)] bg-gray-100 rounded-lg">

        <div className="w-full max-w-max p-8 rounded-lg shadow-lg">          
          <div className='flex justify-between items-center mb-2'>

            <div className="flex justify-start items-center">
              <MdVerifiedUser size={20} className='text-green-700 mr-2'/>          
              <h2 className="text-lg font-semibold mr-5">CENTRO DE VERIFICACION DE CUENTAS</h2>    
            </div>

              <div className="flex justify-end items-center">
                <img src={loginIMG} alt="Falcon" className="h-8 mr-2" />                       
              </div>
    
          </div>
          
          <div className="border-1 border-double border-gray-400 mt-3 mb-3">
              <div className="flex items-center justify-center">                    
                <MdVerifiedUser size={50} className="text-green-700 mb-2 mt-2" />                
              </div> 

              <h2 className="text-lg font-semibold text-center mb-4 pl-10 pr-10">{msg.toUpperCase()}</h2>
                <p className='ml-5 flex justify-start items-center'><MdEmail      size={20} className='text-green-700 mr-2'/><strong>Email     : </strong> {user.email}</p>
                <p className='ml-5 flex justify-start items-center'><FaUserCheck  size={20} className='text-green-700 mr-2'/><strong>Nombres   : </strong> {user.nombres}</p>
                <p className='ml-5 flex justify-start items-center'><FaUserTie    size={20} className='text-green-700 mr-2'/><strong>Apellidos : </strong> {user.apellidos}</p>
              <br />

              <span className='block text-sm font-bold text-blue-700 mb-1 text-center'>{subtitulo ? subtitulo : 'No se muestra nada'  }</span>
          </div> 
          { /* -- BOTON GRABAR DATOS -- */}                
            <Link
              to="/"              
              rel="noopener noreferrer"
              
              className="w-full text-gray-800 py-2 rounded-lg flex items-center justify-center shadow-md border border-gray-300
              hover:bg-blue-500 hover:text-white transition-colors duration-200 hover:outline-none hover:ring-2 hover:ring-blue-500"
            >
              <FaHome size={20} className="mr-2"/>
              Inicio
            </Link>          
        </div>
      </div>
    </div>
  );
}