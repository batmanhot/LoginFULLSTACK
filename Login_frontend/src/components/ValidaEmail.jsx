import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { MdError, MdEmail, FaCheckCircle, FaTimesCircle, FaDoorClosed, FaHome, MdVerifiedUser}  from "../assets/index.js";
import { loginIMG } from "../assets/index.js";
import { Link } from 'react-router-dom';  


export default function ValidaEmail() {

  const { token } = useParams(); 
  const [confirmado, setConfirmado] = useState(false);
  const [ mensaje, setMensaje] = useState({});
  const [datouser, setDatoUser] = useState({});


  useEffect(() => {
    const Valida = async () => {
        // console.log('Analizando')

        try {
            // console.log('Entro a TRY')
            const response = await axios.get(`http://localhost:4000/api/verify/${token}`);       
            console.log(`http://localhost:4000/api/verify/${token}`);
            setConfirmado(true);

            setMensaje({ msg: `${response.data.message}`, error: response.data.errores} );
            setDatoUser({ cliente: `${ response.data.user.email}` })

            // console.log('Cliente', response.data.user.email)
            // console.log('Cliente', response.data.user.password)
            
                
        } catch (error) {
            setConfirmado(false);
            //console.log(error)
            console.log('Mensaje ',error.response.data.message);
            setMensaje({ msg: `${error.response.data.message}`, error: error.response.data.errores})
            console.log('Entro a CATCH');
        }
    }
    Valida();
  }, [token]);

    return (
        <>
        {!mensaje.error && ( 
        // {confirmado && (
          <>                      
            <div className='w-screen h-screen flex items-center justify-center '>
              <div className="w-full max-w-max flex items-center justify-center text-[rgb(31,41,55)] bg-gray-200 rounded-lg">
  
                <div className="w-full max-w-max p-8 rounded-lg shadow-lg">          
                  <div className='flex justify-between items-center mb-2'>
  
                    <div className="flex justify-start items-center">
                      <MdVerifiedUser size={20} className='text-blue-900 mr-2'/>          
                      <h2 className="text-lg font-semibold mr-5">CENTRO DE VERIFICACION DE CUENTAS</h2>    
                    </div>
  
                      <div className="flex justify-end items-center">
                        <img src={loginIMG} alt="Falcon" className="h-8 mr-2" />                       
                      </div>
                  </div>
                  
                    <div className="border-4 border-double border-gray-400 mt-3 mb-3"> 
                       <div className="flex items-center justify-center">   
                          {!mensaje.error && (                    
                            <FaCheckCircle size={50} className="text-green-600 mb-2 mt-5"/>
                          )}                          
                       </div>

                       {!mensaje.error && (                         
                          <div>
                            <h2 className="text-2xl font-bold text-center mb-4">Bienvenido <span>{datouser.cliente ? datouser.cliente : ''}</span>  </h2>                  
                            <p className='text-center text-sm'>{mensaje.msg ? mensaje.msg : ''} <br /><br /> <span className="text-blue-500 font-bold">Ya puedes iniciar sesión.</span></p>                      
                          </div>
                        )}                
                  </div>                                

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
          </>
        )}

        {/* { !confirmado && (  */}
        {mensaje.error && ( 
            
        <div className='w-screen h-screen flex items-center justify-center '>
              <div className="w-full max-w-max flex items-center justify-center text-[rgb(31,41,55)] bg-gray-200 rounded-lg">
  
                <div className="w-full max-w-max p-8 rounded-lg shadow-lg">          
                  <div className='flex justify-between items-center mb-2'>
  
                    <div className="flex justify-start items-center">
                      <MdVerifiedUser size={20} className='text-blue-900 mr-2'/>          
                      <h2 className="text-lg font-semibold mr-5">CENTRO DE VERIFICACION DE CUENTAS</h2>    
                    </div>
  
                      <div className="flex justify-end items-center">
                        <img src={loginIMG} alt="Falcon" className="h-8 mr-2" />                       
                      </div>
                  </div>
                  
                    <div className="border-4 border-double border-gray-400 mt-3 mb-3"> 
                       
                       
                       <div className="flex items-center justify-center">                           
                          {mensaje.error && (   
                            <FaTimesCircle size={50} className="text-red-600 mb-2 mt-5" /> 
                          )}
                       </div>


                      {mensaje.error && (
                        <div>
                          <h2 className="text-lg font-semibold text-center mt-5 mb-5 pl-10 pr-10">😫 {mensaje.msg ? mensaje.msg : ''} </h2>    
                          <span className='block text-sm font-bold text-blue-700 mb-1 text-center'>Vaya al inicio y vuelve a solicitarlo!</span> 
                        </div>
                      )}
                  </div>                                  

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
        )}

        </>       
    );
}
