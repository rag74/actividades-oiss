import React from 'react'
import './PanelAdmin.css';
import { useNavigate } from 'react-router-dom'

function PanelAdmin() {

  const navigate = useNavigate();

  return (
    <>
        <div className="viñeta">
          <h3>SG Secretaría General</h3>
            <button className='buttonViñeta' onClick={()=>navigate("/presup/SG/")}>
              Listado Actividades/Presupuesto
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/activ/SG/")}>
              Solo actividades realizadas
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/nocod/SG/")}>
              Crear actividad sin código
            </button>
        </div>

        <div className="viñeta">
          <h3>CR Centro América y Caribe</h3>
            <button className='buttonViñeta' onClick={()=>navigate("/presup/CRCAC/")}>
              Listado Actividades/Presupuesto
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/activ/CRCAC/")}>
              Solo actividades realizadas
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/nocod/CRCAC/")}>
              Crear actividad sin código
            </button>
        </div>

        <div className="viñeta">
          <h3>CR Colombia y Zona Andina</h3>
            <button className='buttonViñeta' onClick={()=>navigate("/presup/CRCZA/")}>
              Listado Actividades/Presupuesto
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/activ/CRCZA/")}>
              Solo actividades realizadas
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/nocod/CRCZA/")}>
              Crear actividad sin código
            </button>
        </div>

        <div className="viñeta">
          <h3>CR Cono Sur</h3>
            <button className='buttonViñeta' onClick={()=>navigate("/presup/CRCS/")}>
              Listado Actividades/Presupuesto
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/activ/CRCS/")}>
              Solo actividades realizadas
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/nocod/CRCS/")}>
              Crear actividad sin código
            </button>
        </div>

        <div className="viñeta">
          <h3>DL Bolivia</h3>
            <button className='buttonViñeta' onClick={()=>navigate("/presup/DBOL/")}>
              Listado Actividades/Presupuesto
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/activ/DBOL/")}>
              Solo actividades realizadas
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/nocod/DBOL/")}>
              Crear actividad sin código
            </button>  
        </div>

        <div className="viñeta">
          <h3>DL Chile</h3>
            <button className='buttonViñeta' onClick={()=>navigate("/presup/DCHI/")}>
              Listado Actividades/Presupuesto
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/activ/DCHI/")}>
              Solo actividades realizadas
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/nocod/DCHI/")}>
              Crear actividad sin código
            </button>  
        </div>

        <div className="viñeta">
          <h3>DL Brasil</h3>
          <button className='buttonViñeta' onClick={()=>navigate("/presup/DBRA/")}>
              Listado Actividades/Presupuesto
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/activ/DBRA/")}>
              Solo actividades realizadas
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/nocod/DBRA/")}>
              Crear actividad sin código
            </button>  
        </div>

        <div className="viñeta">
         <h3>DL Paraguay</h3>
            <button className='buttonViñeta' onClick={()=>navigate("/presup/DPAR/")}>
              Listado Actividades/Presupuesto
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/activ/DPAR/")}>
              Solo actividades realizadas
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/nocod/DPAR/")}>
              Crear actividad sin código
            </button>   
        </div>

        <div className="viñeta">
          <h3>DL República Dominicana</h3>
          <button className='buttonViñeta' onClick={()=>navigate("/presup/DDOM/")}>
              Listado Actividades/Presupuesto
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/activ/DDOM/")}>
              Solo actividades realizadas
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/nocod/DDOM/")}>
              Crear actividad sin código
            </button>   
        </div>

        <div className="viñeta">
          <h3>CIEF</h3>
            <button className='buttonViñeta' onClick={()=>navigate("/presup/CIEF/")}>
              Listado Actividades/Presupuesto
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/activ/CIEF/")}>
              Solo actividades realizadas
            </button>
            <button className='buttonViñeta' onClick={()=>navigate("/nocod/CIEF/")}>
              Crear actividad sin código
            </button>  
        </div>
    </>
  )
}

export default PanelAdmin