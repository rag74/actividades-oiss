import React from 'react'
import './PanelUser.css';
import { useNavigate } from 'react-router-dom'
import { useUserAuth } from "../../context/UserAuthContext"

function PanelUser({userLevels, user}) {

  const {OISSViñetas} = useUserAuth()
  const navigate = useNavigate();

  const gotoHandle= (center,destino)=>{
    console.log(center,destino)
    navigate(`/${destino}/${center}/`)

  }

  const viñetaCentro = OISSViñetas.map(item=>(
          <div key={item.sigla}>
          { (userLevels.todo || userLevels.region == item.sigla) &&
                <div className="viñeta" >
                <h3>{item.centro}</h3>
                  <button className='buttonViñeta' disabled={userLevels.nivel == 3 ? true : false} onClick={()=>gotoHandle(item.sigla , "presup" )}>
                    Listado Actividades/Presupuesto
                  </button>
                  <button className='buttonViñeta' onClick={()=>gotoHandle(item.sigla , "activ" )}>
                    Solo actividades realizadas
                  </button>
                  <button className='buttonViñeta' onClick={()=>gotoHandle(item.sigla , "nocod" )}>
                    Crear actividad sin código
                  </button> 
                </div>
            }
            </div>
            ))

 
  return (
    <>
       {viñetaCentro}   
    </>
  )
}

export default PanelUser