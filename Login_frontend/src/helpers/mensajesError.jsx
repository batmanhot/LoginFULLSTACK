import React from 'react'

function mensajesError({mensaje}){


  return (
        <div>
         {/* { mensaje && <span className=" text-xs font-medium text-red-500 mb-1"> { mensaje } </span> }          */}
         { mensaje && <span className="block text-sm font-medium text-red-500 mb-0"> { mensaje } </span> }         
        </div>
  )  
}

export default mensajesError