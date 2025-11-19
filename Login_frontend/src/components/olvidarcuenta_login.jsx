import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import MensajesError from '../helpers/mensajesError.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import {loginIMG, MdEmail, FaUser, FaDoorClosed, FaSave} from "../assets/index.js";

export default function OlvidarCuenta() {   

  const navigate = useNavigate();


    //Formulario - Hooks Forms
      const { register, handleSubmit, formState: { errors } } = useForm();  //1
  
      const enviodata_olvidar = data => { 
        console.log("Formulario enviado");
        console.log(data)
        grabarDatos(data.email);
      };   //2


      const grabarDatos = async (email) => {

      try {
          const res = await axios.post('http://localhost:4000/api/request-reset', { email });          
          //console.log(res.data);

          // Toast de éxito
          // toast.success('Se guardo con exito', { autoClose: 3000 });

          toast.success(res.data.message, { autoClose: 1000 });
          //toast.success('Se guardo con exito', { autoClose: 3000 });

          navigate("/datosAceptados", { state: { user: res.data.user, msg: res.data.message, subtitulo: res.data.messageValid} });

      } catch (err) {
          // Toast de error
          toast.error('No se puedo guardar el registro');
          console.log(err.message);          
      }      
   };


  return (
    <div className='w-screen h-screen flex items-center justify-center'>

      {/*------ TOAST NOTIFICATIONS ----- */}
      <ToastContainer
      position="top-center"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />  

      <div className="w-110 flex items-center justify-center text-[rgb(31,41,55)] bg-gray-100 rounded-lg">

        <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
          {/* -- TITULO -- */}  
          <div className='flex justify-between items-center mb-2'>
            <div className="flex justify-start items-center">
              <FaUser size={20} style={{ marginRight: '5px' }}/>
              <h2 className="text-xl font-semibold">Recuperar Contraseña</h2>    
            </div>

              <div className="flex justify-end items-center">
                <img src={loginIMG} alt="Falcon" className="h-8 mr-2" />                       
              </div>
              
          </div>
          
          <div className="border-3 border-double border-gray-300 mb-3"></div>

         {/* -- FORMULARIO -- */}
         <form className="space-y-2" onSubmit={ handleSubmit (enviodata_olvidar) } noValidate>

          <div className='flex justify-between items-center mb-2'>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Nombres</label>
            <MensajesError mensaje={errors.email?.message}/>
          </div>

          {/* -- FORMULARIO <<EMAIL>> -- */}        
           <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MdEmail size={20} style={{ marginRight: '3px' }} />
            </div>
         
            <input type="email" 
              placeholder="Correo electrónico" 
              id="email" 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border border-border-4"
              {...register("email",{required: {
                                  value: true,                                   
                                  message:"El correo electronico es obligatorio", 
                                }                            
                          })}
              />
          </div>


          {/* -- BOTON GRABAR DATOS -- */}       
          
          <div className="max-w-md mx-auto flex justify-between items-center mt-4">

            <button type='submit'                
                className="w-full text-gray-800 py-2 rounded-lg flex items-center justify-center shadow-md border mr-2 border-gray-300 
                hover:bg-blue-500 hover:text-white transition-colors duration-200 hover:outline-none hover:ring-2 hover:ring-blue-500"
              >
                <FaSave size={20} className="mr-2"/>
                Grabar datos
            </button>
            
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