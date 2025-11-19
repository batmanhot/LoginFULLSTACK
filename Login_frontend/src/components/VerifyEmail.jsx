import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { MdError, MdEmail, FaCheckCircle, FaTimesCircle, FaDoorClosed, MdVerifiedUser}  from "../assets/index.js";
import { loginIMG } from "../assets/index.js";
import { Link } from 'react-router-dom';  

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function VerifyEmail() {
  const { token } = useParams();

  

//  const [confirmado, setConfirmado] = useState(false);
//  const [mensaje, setMensaje] = useState({});
//  const [loading, setLoading] = useState(true);
//  const [datouser, setDatoUser] = useState({});

// useEffect(() => {
  
// 		const verify = async () => {

// 			 try {
      
//           const response = await axios.get(`http://localhost:4000/api/verify/${token}`);      
//           console.log('Analizando respuesta')
      

//           setConfirmado(true);

//           setDatoUser({ cliente: `${ response.data.user.email}` })
//           setMensaje({ msg: `${response.data.message}`, error: false} );

//           //console.log("Verificando token :", token);
//           //console.log("Respuesta de la API:", response.data);
//           //console.log("Cuenta verificada con éxito", status);              

//        } catch (err) {

//           //console.log(err.response.data)
//           //setMensaje({ msg: err.response.data , error: true});
//           //setMensaje({ msg: `${err.response.data.message}`, error: true});
          
//           setConfirmado(false);
//           //console.log("Error al verificar la cuenta:", err.response.data.msg);
//         }        

//         setLoading(false)
//       }
//       verify();

      
//     // Toast de Verificacion
//       if (loading){
//        toast.success('Espere un momento estamos verificando cuenta', { autoClose: 1000 });
//       } 
//     }, []);


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
      <div className="flex items-center justify-center text-[rgb(31,41,55)] bg-gray-100 rounded-lg">

        <div className="w-full max-w-xl p-8 rounded-lg shadow-lg">
          {/* -- TITULO -- */}  
          <div className='flex justify-between items-center mb-2'>

            <div className="flex justify-start items-center">
              <MdVerifiedUser size={25} style={{ marginRight: '5px' }}/>
              <h2 className="text-xl font-semibold">VALIDACION DE CUENTA PARA ACCESO</h2>    
            </div>

            <div className="flex justify-end items-center">
               <img src={loginIMG} alt="Falcon" className="h-8 mr-2" />  
            </div> 
              
          </div>
          
          <div className="border-3 border-double border-gray-300 mb-3"></div>

          <div className="flex items-center justify-center mb-6">

            {confirmado && (
              <div>
                <FaCheckCircle size={50} style={{ color: 'green' }} />
              </div>
            )}

            {!confirmado && (
              <div>
                <FaTimesCircle  size={50} style={{ color: 'red' }} />
              </div>
            )}

          </div>
          
                     
          {confirmado && !mensaje.error && (
            <div>

              <h2 className="text-2xl font-bold text-center mb-4">Bienvenido <span>{datouser.cliente ? datouser.cliente : ''}</span>  </h2>                  
                <p className='text-center text-sm'>{mensaje.msg ? mensaje.msg : ''} <br /><br /> <span className="text-blue-500 font-bold">Ya puedes iniciar sesión.</span></p>      

            </div>
          )} 
            

          {!confirmado && (
            <div>

              <h2 className="text-2xl font-bold mb-4 text-center"> Error de verificación</h2>                
              <p className='text-center text-sm'>{mensaje.msg ? mensaje.msg : ''} <br /><br /> <span className="text-blue-500 font-bold">Solicita uno nuevo desde el login.</span> </p>

            </div>
          )} 

          {/* -- BOTON HOME  -- */}                 
          <div className="max-w-xl mx-auto flex justify-between items-center mt-4">            
              <Link
                to="/"              
                // target="_blank"
                rel="noopener noreferrer"
                
                className="w-full text-gray-800 py-2 rounded-lg flex items-center justify-center shadow-md border border-gray-300
                hover:bg-blue-500 hover:text-white transition-colors duration-200 hover:outline-none hover:ring-2 hover:ring-blue-500"
              >
              <FaDoorClosed size={20} className="mr-2"/>
              HOME
            </Link>
          </div>

        </div>
      </div>
    </div>

  );
}
