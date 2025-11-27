import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MensajesError from '../helpers/mensajesError.jsx';

import { loginIMG, MdEmail, RiLockPasswordFill, LiaEyeSolid, RiEyeCloseLine, FaUser, FaPhoneAlt, FaUserCircle, FaDoorClosed, FaSave} from "../assets/index.js";

export default function CrearCuenta() {


  const navigate = useNavigate();

   //Formulario - Hooks Forms
    const { register, handleSubmit, formState: { errors }, reset} = useForm();  //1

    const enviodata_crear = data => { 
      console.log("Formulario enviado");
      //console.log(data)
      grabarDatos(data.email, data.password, data.nombres, data.apellidos, data.telefono);

      // Limpiar el formulario después de enviar
      // reset();

    };   //2

    const grabarDatos = async (email, password, nombres, apellidos, telefono) => {

      try {
          const res = await axios.post('http://localhost:4000/api/register', { email, password, nombres, apellidos, telefono });    

          // Toast de éxito
          toast.success(res.data.message, { autoClose: 1000 });

          navigate("/datosAceptados", { state: { user: res.data.user, msg: res.data.message, subtitulo: res.data.messageValid} });
          reset()

      } catch (err) {

          // Toast de error
          // toast.error('No se puedo guardar el registro');
          // toast.success(res.data.message, { autoClose: 1000 });
                    
           console.log("GRAN ERROR",err);
           console.log(err.message);
           toast.error(err.response.data.message, { autoClose: 1000 });
      }      
   };


    // 1. Estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(true);

    //2. Función para alternar la visibilidad al hacer clic
     const toggleVisibility = () => {
       setShowPassword(!showPassword);
       console.log(showPassword); 
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
              <h2 className="text-xl font-semibold"> Crear Cuenta</h2>    
            </div>

              <div className="flex justify-end items-center">
                <img src={loginIMG} alt="Falcon" className="h-8 mr-2" />
              </div>
  
          </div>
          
          <div className="border-3 border-double border-gray-300 mb-3"></div>

         {/* -- INICIO DE FORMULARIO -- */}
         {/* -------------------------- */}
         
         <form className="space-y-2" onSubmit={ handleSubmit (enviodata_crear) } noValidate>

          {/* -- FORMULARIO <<NOMBRES>> -- */}    
          {/* ---------------------------- */}    

          <div className='flex justify-between items-center mb-2'>
            <label htmlFor="nombres" className="block text-sm font-medium text-gray-700 ">Nombres</label>
            <MensajesError mensaje={errors.nombres?.message}/>
          </div>


          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaUserCircle size={20} style={{ marginRight: '3px' }} />
            </div>
         
            <input type="text" 
              placeholder="Nombres" 
              id="nombres" 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border border-border-4"
              {...register("nombres",{required: {
                                     value: true,                                   
                                     message:"El nombre es obligatorio", 
                                    }                            
                                    })}              
              />
          </div>

          {/* --- FORMULARIO <<APELLIDOS>> -- */}   
          {/* ------------------------------- */}       

          <div className='flex justify-between items-center mb-2'>
            <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">Apellidos</label>      
            <MensajesError mensaje={errors.apellidos?.message}/>
          </div>
          
           <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaUserCircle size={20} style={{ marginRight: '3px' }} />
            </div>
         
            <input type="text" 
              placeholder="Apellidos" 
              id="apellidos" 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border border-border-4"
              {...register("apellidos",{required: {
                                     value: true,                                   
                                     message:"Los Apellidos es obligatorio", 
                                    }                            
                                    })} 
              />
          </div>

          {/* --- FORMULARIO <<TELEFONO>> -- */}
          {/* ------------------------------ */}

          <div className='flex justify-between items-center mb-2'>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Telefono</label>
            
            <MensajesError mensaje={errors.telefono?.message}/>
          </div>          

          <div className="relative w-full">
             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaPhoneAlt size={20} style={{ marginRight: '3px' }} />
             </div>
         
            <input type="number" 
              placeholder="Numero de Telefono" 
              id="telefono" 
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border border-border-4"
              {...register("telefono",{required: {
                                  value: true,                                   
                                  message:"El numero de telefono es obligatorio", 
                                }                            
                                })} 
              
              />
          </div>

          {/* -- FORMULARIO <<EMAIL>> -- */}
          {/* -------------------------- */}
          
          <div className='flex justify-between items-center mb-2'>            
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <MensajesError mensaje={errors.email?.message}/>
          </div>
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

          {/* -- FORMULARIO <<PASSWORD>> -- */}
          {/* ----------------------------- */}
          
          <div className='flex justify-between items-center mb-2'>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            
            <MensajesError mensaje={errors.password?.message}/>
          </div>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">            
              <RiLockPasswordFill size={20} style={{ marginRight: '3px' }} />
            </div>

            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña" 
              id='password'            
              className="w-full px-10 py-2 pr-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password",{required: {
                                  value: true,                                   
                                  message:"La contraseña es obligatorio", 
                                }                            
                                })}        
              />
          
            <div className="absolute inset-y-0 right-2 flex justify-center items-center">
                {showPassword ? (
                  // Ojo Abierto (visible)
                  <LiaEyeSolid onClick={toggleVisibility} size={20} />                
                  
                ) : (
                  // Ojo Cerrado (oculto)
                  <RiEyeCloseLine onClick={toggleVisibility} size={20} />
                )}
            </div> 
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