import React from 'react'
import './PanelUser.css';
import { useNavigate , Link} from 'react-router-dom'
import { useUserAuth } from "../../context/UserAuthContext"

function PanelUser({userLevels, user, yearLink}) {

  const {OISSViñetas} = useUserAuth()
  const navigate = useNavigate();

  const gotoHandle= (center,destino)=>{
    console.log(center,destino)
    navigate(`/${destino}/${yearLink}/${center}/`)

  }

  const viñetaCentro = OISSViñetas.map(item=>(
          <div key={item.sigla}>
          { (userLevels.administrador || userLevels.region == item.sigla) &&
                <div className="viñeta" >
                <h3>{item.centro}</h3>
                  <button className='buttonViñeta' disabled={userLevels.nivel == 3 ? true : false} onClick={()=>gotoHandle(item.sigla , "actividades" )}>
                    Listado y gestión de actividades realizadas
                  </button>
                  <button className='buttonViñeta' onClick={()=>gotoHandle(item.sigla , "cuadro" )}>
                    Cuadro informe (actividades)
                  </button>
                  <button className='buttonViñeta' onClick={()=>gotoHandle(item.sigla , "nocod" )}>
                    Crear actividad
                  </button> 
                </div>
            }
            </div>
            ))

 
  return (
    <>
       {viñetaCentro}
       {userLevels.administrador && 
            <div className="viñeta" >
                <h3>Estadísiticas OISS</h3>
                <div>
                <Link to="/stats/OISS"><div class="buttonNew ml-0">Estadísiticas generales</div></Link>
                <Link to="/statscomp/OISS"><div class="buttonNew ml-0">Estadísiticas comparadas</div></Link>
                </div>
             
            </div>}  
    </>
  )
}

export default PanelUser