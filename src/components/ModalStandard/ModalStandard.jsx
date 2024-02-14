import React, { useEffect, useState } from 'react'
import './ModalStandard.css'
import { Link, useParams , useNavigate , useLocation } from "react-router-dom";
import {useUserAuth} from '../../context/UserAuthContext';
import ScaleLoader from "react-spinners/ScaleLoader"; 

function ModalStandard({modaltipo, tipoerror, setVermodal, user, ID, REG, recupero}) {

    console.log(modaltipo)

    const {guardarCodigoContable,eliminarFicha} = useUserAuth()


  const [modaltitle, setModaltitle] = useState()
  const [modalmessage, setModalmessage] = useState()
  const [buttonmessage, setButtonmessage] = useState()
  const [linkmodal, setLinkmodal] = useState()
  const [closemodal, setClosemodal] = useState("")
  const [uploadButton, setuploadButton] = useState(false)
  const [buttonColor, setbuttonColor] = useState()

  const navigate = useNavigate()

  useEffect(() => {
    switch (modaltipo){
        case "fichaGuardada":
            setModaltitle("Ficha guardada")
            setModalmessage("el borrador ha sido guardado correctamente en el servidor")
            setButtonmessage("OK")
            setLinkmodal("/activ/"+REG)
            setClosemodal("#")
            break;
    
        case "errorSubida":
            setModaltitle("Error")
            setModalmessage(tipoerror)
            setButtonmessage("Cerrar")
            setLinkmodal("#")
            break;
        
        case "eliminar":
            setModaltitle("Eliminar ficha")
            setModalmessage(`AVISO: solicitamos su confirmación para eliminar la actividad "${recupero.titulo}" (por seguridad se dejará una copia en el servidor para guardar registro de la acción pero no estará más accesible para los usuarios).`)
            setButtonmessage("ELIMINAR")
            setbuttonColor("warn")
            setLinkmodal("#")
            setClosemodal("#")
            break;
      }

  }, [modaltipo])


  const handleEliminar = async ()=> {
    var espera
    var editor = [user.email,user.uid]
    var tipoFicha = "eliminada"
    var modificación = Date.now()
    const idFicha = recupero.id+'-'+recupero.creado
    const estadoFicha = {
        tipoFicha,
        editor,
        modificación
    }

    setuploadButton(true)
    espera = await eliminarFicha(estadoFicha,idFicha)
    console.log("eliminada???")
    console.log(espera)
    if (espera === true) {
        setButtonmessage("Cerrar")
        setModaltitle("Ficha eliminada correctamente.")
        setLinkmodal("/activ/"+REG)
        setuploadButton(false)
    }

  }
  
  const goBack = () => {
    navigate(-1);}
 

  return (
    <div id="miModal" className="modal">
                <div className="modal-contenido">
                    <div className="cabeceraModal">
                        <h2>{modaltitle}</h2>
                        <Link to={closemodal}><i className="fas fa-times close cerrar" onClick={()=>setVermodal(false)}></i></Link>
                    </div>
                    <hr className="divisorModal" />
                    <div className="mensajeModal">
                        <p>{modalmessage}</p>
                    </div>

                    { uploadButton ? 
                    <Link to={linkmodal}><div className={`buttonModal ${buttonColor}`}><ScaleLoader color="#ffffff" height={10} margin={2} radius={0} speedMultiplier={1}/></div></Link> 
                        :
                    <Link to={linkmodal}><div className={`buttonModal ${buttonColor}`} onClick={buttonmessage == "ELIMINAR" ? ()=>handleEliminar() : ()=>goBack() }>{buttonmessage}</div></Link>
                    }
                </div>  
    </div>
    
  )
}

export default ModalStandard

