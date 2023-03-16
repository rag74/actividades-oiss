import React from 'react'
import "./Entrada.css"
import { useNavigate , Link } from 'react-router-dom'

function Entrada() {

 const navigate = useNavigate();

 const handleEntrar = ()=> navigate("/panel");

  return (
    <div className='fondoingreso'>
        <h2>Registro de actvidades OISS - version 0.1</h2>
        <div className='navbutton' /*onClick={handleEntrar}*/><Link to="/panel">Ingresar</Link></div>
    </div>
  )
}

export default Entrada