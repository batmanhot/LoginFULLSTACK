import React, { useState } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom'; 
import { useForm } from 'react-hook-form';
import axios from 'axios';

import MensajesError from '../helpers/mensajesError.jsx';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { loginIMG, RiLockPasswordFill, LiaEyeSolid, RiEyeCloseLine, FaUser, FaDoorClosed, FaSave} from "../assets/index.js";

export default function NuevaContrasena() {

    const { token } = useParams();

    const navigate = useNavigate();

   //Formulario - Hooks Forms
    const { register, handleSubmit, reset, getValues, formState: { errors } } = useForm();  //1

    const enviodata_nuevacontrasena = data => { 
      console.log("Formulario enviado");
      console.log(data)
      grabarDatos(data.password);

    };   //2
   
      
    // 1. Estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(true);
 
    //2. Función para alternar la visibilidad al hacer clic
     const toggleVisibility = () => {
       setShowPassword(!showPassword);
       console.log(showPassword); 
     };

    // 3. Estado para controlar la visibilidad de la contraseña 2
    const [showPassword2, setShowPassword2] = useState(true);

    // 4. Función para alternar la visibilidad al hacer clic 2
     const toggleVisibility2 = () => {
       setShowPassword2(!showPassword2);
       console.log(showPassword2); 
     };

   const grabarDatos = async (password) => {

      try {
          // console.log('Password Pasado',password)
          // console.log('Token Pasado',token)

          const res = await axios.post(`http://localhost:4000/api/reset-password/${token}`, { password });         
          console.log(res.data);

          // Toast de éxito
          toast.success(res.data.message, { autoClose: 1000 });
          //toast.success('Se guardo con exito', { autoClose: 3000 });
          //console.log('Se grabo con exito');
          reset();

          //Pantalla finalizada  -  Navegamos a la nueva página pasando los datos
          //console.log(res.data.user);
          

          navigate("/datosAceptados", { state: { user: res.data.user, msg: res.data.message, subtitulo: res.data.messageValid} });

      } catch (err) {
          // Toast de error
          console.log("GRAN ERROR",err);
          console.log(err.message);
          toast.error(err.response.data.message, { autoClose: 1000 });
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
              <h2 className="text-xl font-semibold">Nueva Contraseña</h2>    
            </div>

              <div className="flex justify-end items-center">
              <img src={loginIMG} alt="Falcon" className="h-8 mr-2" />
              
              </div>
              
          </div>

          {/* -- LINEA DIVISORA -- */}
          <div className="border-3 border-double border-gray-300 mb-3"></div>

         {/* -- FORMULARIO -- */}
         <form className="space-y-2" onSubmit={ handleSubmit (enviodata_nuevacontrasena) } noValidate>

          <div className='flex justify-between items-center mb-2'>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Nueva Contraseña</label>            
            <MensajesError mensaje={errors.password?.message}/>
          </div>

          <div className="relative w-full ">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">            
              <RiLockPasswordFill size={20} style={{ marginRight: '3px' }} />
            </div>

            <input 
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña" 
              id='password'    
              name='password'    
              className="w-full px-10 py-2 pr-8 border mb-1 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

          {/* -- FORMULARIO <<PASSWORD>> 2-- */}

          <div className='flex justify-between items-center mb-2'>
            <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-1">Repetir Contraseña</label>
            <MensajesError mensaje={errors.password2?.message}/>
          </div>
          
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">            
              <RiLockPasswordFill size={20} style={{ marginRight: '3px' }} />
            </div>

            <input 
              type={showPassword2 ? "text" : "password"}
              placeholder="Contraseña" 
              id='password2'        
              className="w-full px-10 py-2 pr-8 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register("password2",{
                            required: {
                                value: true,                                   
                                message:"La repeticion de la contraseña es obligatorio",                   
                              },
                              validate: (value) =>
                                //value === password.current || "Las contraseñas no coinciden", 
                                value === getValues("password") || "Las contraseñas no coinciden",                           
                              })}      
              />
          
            <div className="absolute inset-y-0 right-2 flex justify-center items-center">
                {showPassword2 ? (
                  // Ojo Abierto (visible)
                  <LiaEyeSolid onClick={toggleVisibility2} size={20} />                
                  
                ) : (
                  // Ojo Cerrado (oculto)
                  <RiEyeCloseLine onClick={toggleVisibility2} size={20} />
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