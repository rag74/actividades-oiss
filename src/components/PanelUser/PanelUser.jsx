import React from 'react'
import { useNavigate } from 'react-router-dom'

function PanelUser({userLevels, user}) {
  console.log("PANEL USER")
  console.log(user)
  console.log(userLevels.nivel)

  const navigate = useNavigate();

const gotoHandle= (center,destino)=>{
        console.log(center,destino)
        navigate(`/${destino}/${center}/`)

      }


  return (
    <div className="viñeta">
    <h3>{userLevels.centro}</h3>
      <button className='buttonViñeta' disabled={userLevels.nivel == 3 ? true : false} onClick={()=>gotoHandle(userLevels.region , "presup" )}>
        Listado Actividades/Presupuesto
      </button>
      <button className='buttonViñeta' onClick={()=>gotoHandle(userLevels.region , "activ" )}>
        Solo actividades realizadas
      </button>
      <button className='buttonViñeta' onClick={()=>gotoHandle(userLevels.region , "nocod" )}>
        Crear actividad sin código
      </button>
  </div>
  )
}

export default PanelUser