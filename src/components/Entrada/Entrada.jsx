import React from 'react'
import "./Entrada.css"
import { Link } from 'react-router-dom'

function Entrada() {



  return (
    <div className='fondoingreso'>
        <h2>Registro de actvidades OISS - version 0.3</h2>
        <div className='navbutton' /*onClick={handleEntrar}*/><Link to="/panel">Ingresar</Link></div>
    </div>
  )
}

export default Entrada