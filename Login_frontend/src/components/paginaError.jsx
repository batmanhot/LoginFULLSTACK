import React from 'react';

import { MdError, MdEmail, FaDoorClosed, FaSave} from "../assets/index.js";
import { loginIMG, paginaerror} from "../assets/index.js";
import { Link } from 'react-router-dom';

export default function OlvidarCuenta() {   

  return (
    <div className='w-screen h-screen flex items-center justify-center'>
      <div className="w-110 flex items-center justify-center text-[rgb(31,41,55)] bg-gray-100 rounded-lg">

        <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
          {/* -- TITULO -- */}  
          <div className='flex justify-between items-center mb-2'>
            <div className="flex justify-start items-center">
              <MdError size={20} style={{ marginRight: '5px' }}/>
              <h2 className="text-xl font-semibold">PAGINA NO ENCONTRADA</h2>    
            </div>

              <div className="flex justify-end items-center">
                <img src={loginIMG} alt="Falcon" className="h-8 mr-2" />                       
              </div>
              
          </div>
          
          <div className="border-3 border-double border-gray-300 mb-3"></div>


          <div className="flex items-center justify-center mb-6">
            <img src={ paginaerror } alt="Falcon" className="h-50 mr-2" /> 
          </div>
          

         {/* -- FORMULARIO -- */}
         <form className="space-y-2">

          {/* -- BOTON GRABAR DATOS -- */}       
          
          <div className="max-w-md mx-auto flex justify-between items-center mt-4">            
            <Link
              to="/"              
              // target="_blank"
              rel="noopener noreferrer"
              
              className="w-full text-gray-800 py-2 rounded-lg flex items-center justify-center shadow-md border border-gray-300
              hover:bg-blue-500 hover:text-white transition-colors duration-200 hover:outline-none hover:ring-2 hover:ring-blue-500"
            >
              <FaDoorClosed size={20} className="mr-2"/>
              Cerrar
            </Link>
          </div>
         </form>
        </div>
      </div>
    </div>
  );
}