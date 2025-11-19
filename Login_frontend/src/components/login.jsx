import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import { useForm } from 'react-hook-form';
import MensajesError from '../helpers/mensajesError.jsx';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { loginIMG, FaGoogle, FaFacebook, MdEmail, RiLockPasswordFill, LiaEyeSolid, RiEyeCloseLine } from "../assets/index.js";

export default function Login() {

    //Formulario - Hooks Forms
    const { register, handleSubmit, formState: { errors } } = useForm();  //1

    const enviodata = data => { 
      console.log("Formulario enviado");
      console.log(data)      

      grabarDatos(data.correo, data.pass)

    };   //2

    const navigate = useNavigate();
    
    // 1. Estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);

    //2. Función para alternar la visibilidad al hacer clic
    const toggleVisibility = () => {
      setShowPassword(!showPassword);
      console.log(showPassword); 
    };

    const grabarDatos = async (email, password) => {
      console.log(email, password)

      // Toast de inicio de solicitud
      //toast.info('Enviando solicitud...', { autoClose: 2000 })

      try {
          const res = await axios.post('http://localhost:4000/api/login', { email, password });
          localStorage.setItem('token', res.data.token);
      
          // Toast de éxito
          toast.success('Login exitoso', { autoClose: 3000 });

          navigate('/dashboard');
      } catch (err) {

          // Toast de error
          //toast.error('La información de inicio de sesión no coincide con nuestros registros. ');
          
          console.log("GRAN ERROR",err);
          console.log(err.message);
          toast.error(err.response.data.message, { autoClose: 1000 });

          
      }      
   };
     

  return (
    <div className='w-screen h-screen flex items-center justify-center'>

       {/* <ToastContainer position="top-right" /> */}

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



      <div className="w-110 flex items-center justify-center text-[rgb(31,41,55)] bg-gray-100 rounded-lg shadow-2xl" >

        <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
         <div className="flex items-center justify-center mb-6">
          <img src={loginIMG} alt="Falcon" className="h-10 mr-2" />
            <h1 className="text-3xl font-bold text-[rgb(31,41,55)]">FALCON</h1>
         </div>

         <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Iniciar sesión</h2>
          
          <Link to="/crear-cuenta" className="text-falconAccent text-sm underline">Crear una cuenta </Link>
         </div>

         {/* -- FORMULARIO <<EMAIL>> -- */}
         <form className="space-y-4" onSubmit={ handleSubmit (enviodata ) } noValidate>   
         

          <div className='flex justify-between items-center mb-2'>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electronico</label>
            <MensajesError mensaje={errors.correo?.message}/>
          </div>

          <div className="relative w-full mb-4">
                     
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
               <MdEmail size={20} style={{ marginRight: '3px', margin:'auto'}} />         
            </div>           
         
            <input type="email" 
              className="form-control pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border border-border-4"
              placeholder="Correo electrónico" 
              id="email" 
              {...register("correo",{required: {
                                     value: true,                                   
                                     message:"El email es obligatorio", 
                                    },
                                     pattern:{
                                      value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ ,
                                      message: "El email no tiene un formato valido"
                                     }
                                      })}
              
              // {...register("email", {
              //   required: "El email es obligatorio",
              //   pattern:{
              //     value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ ,
              //     message: "El email no tiene un formato valido"    
              //   }
              // })}
            />
          </div>
        
          {/* -- FORMULARIO <<PASSWORD>> -- */}
          <div className='flex justify-between items-center mb-2'>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <MensajesError mensaje={errors.pass?.message}/> 
          </div>

          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">            
              <RiLockPasswordFill size={20} style={{ marginRight: '3px' }} />
            </div>

            <input 
              className="pl-10 pr-8 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña" 
              id='password'
              minLength="1"
              maxLength="32"

              {...register("pass",{required: {
                                     value: true,                                   
                                     message:"El password es obligatorio",                                                                         
                                    },                                   
                                    //  pattern:{
                                    //   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/,
                                    //   message: "minimo 8 caracteres 1 minuscula 1 mayuscula 1 numero y 1 caracter especial"
                                    //  }
                                      })}   
             />

                         
            <div className="absolute inset-y-0 right-2 flex items-center justify-center">
                {showPassword ? (
                  // Ojo Abierto (visible)
                  <LiaEyeSolid onClick={toggleVisibility} size={20} />                
                  
                ) : (
                  // Ojo Cerrado (oculto)
                  <RiEyeCloseLine onClick={toggleVisibility} size={20} />
                )}

            </div>
            
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Recuerdame
            </label>
            
            <Link to="/olvidar-cuenta" className="text-falconAccent underline">¿Olvidaste tu contraseña?</Link>
            
          </div>
    
          {/* ---- Iniciar sesión ---- */}    

          <div className="max-w-md mx-auto flex justify-between items-center mt-4">
            <button type='submit'
              className="text-xl font-bold text-gray-800 text-shadow-lg py-2 w-full rounded-lg flex justify-center shadow-md hover:bg-gray-700 hover:text-white transition-colors duration-200 "
            >
             INICIO DE SESION AHORA

            </button>
            {/* <a 
              //href="{ handleSubmit }"
              //href="https://www.gob.pe/29101-que-son-las-tecnologias-digitales"
              //target="_blank"
              //rel="noopener noreferrer"
              //className="text-xl font-bold text-gray-800 text-shadow-lg py-2 w-full rounded-lg flex justify-center shadow-md hover:bg-gray-700 hover:text-white transition-colors duration-200 "
            >
              INICIO DE SESION AHORA
            </a> */}
          </div>

      </form>

           {/* ---- Google ---- Facebook ---- */}

          <div className="mt-6 text-center text-sm text-[rgb(31,41,55)] ">
            <small>Inicie sesión con </small>
          </div>

          <div className="max-w-md mx-auto flex justify-between items-center mt-4">
            <a
              href="https://www.gob.pe/29101-que-son-las-tecnologias-digitales"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-gray-800 py-2 rounded-lg flex items-center justify-center shadow-md border mr-2 border-gray-300
               hover:bg-blue-500 hover:text-white transition-colors duration-200 hover:outline-none hover:ring-2 hover:ring-blue-500"
            >
              <FaGoogle size={20} className="mr-2"/>
              Google
            </a> 
           
            <a
              href="https://www.gob.pe/29101-que-son-las-tecnologias-digitales"
              target="_blank"
              rel="noopener noreferrer"
              
              className="w-full text-gray-800 py-2 rounded-lg flex items-center justify-center shadow-md border border-gray-300
              hover:bg-blue-500 hover:text-white transition-colors duration-200 hover:outline-none hover:ring-2 hover:ring-blue-500"
            >
              <FaFacebook size={20} className="mr-2"/>
              Facebook
            </a>

          </div>
        </div>
      </div>
    </div>
  );
}