import React, { useEffect, useState } from 'react'
import './ModalCodigo.css'
import { Link, useParams , useNavigate , useLocation } from "react-router-dom";
import {useUserAuth} from '../../context/UserAuthContext';
import ScaleLoader from "react-spinners/ScaleLoader"; 

function ModalCodigo ({modaltipo, fichaModal, setVermodal, fichas, REG, user, setModaltipo}) {

  console.log(modaltipo)
  console.log(fichas)
  console.log(fichaModal)
  
  const {guardarCodigoContable,eliminarFicha} = useUserAuth()

  const [modaltitle, setModaltitle] = useState()
  const [modalmessage, setModalmessage] = useState()
  const [buttonmessage, setButtonmessage] = useState()
  const [buttonColor, setbuttonColor] = useState()
  const [linkmodal, setLinkmodal] = useState()
  const [closemodal, setClosemodal] = useState("")
  const [textoFinal, settextoFinal] = useState("")
  const [uploadButton, setuploadButton] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    switch (modaltipo){
        case "codigocontable":
            setModaltitle("Asignar código contable")
            setModalmessage(`El código contable se establece a partir del aporte al Plan Estrategico de la actividad "${fichaModal.titulo}". Debe agregar la letra correpondiente al final código ya establecido.`)
            setButtonmessage("Subir")
            setLinkmodal("#")
            setClosemodal("#")
            break;

        case "cambiarcodigo":
            setModaltitle("Modificar código contable")
            setModalmessage(`Modificar la letra correpondiente al final del código contable vigente (en caso de requerir un cambio completo del código debe clickear "editar" al final de la fila y modificar la contribuición al plan estratégico en la ficha antes).`)
            setButtonmessage("Cambiar")
            setLinkmodal("#")
            setClosemodal("#")
            break;
 
        case "eliminar":
            setModaltitle("Eliminar ficha")
            setModalmessage(`AVISO: solicitamos su confirmación para eliminar la actividad "${fichaModal.titulo}" (por seguridad se dejará una copia en el servidor para guardar registro de la acción pero no estará más accesible para los usuarios).`)
            setButtonmessage("ELIMINAR")
            setbuttonColor("warn")
            setLinkmodal("#")
            setClosemodal("#")
            break;

        case "codigoCambiado":
            setModaltitle("Código contable modificado!")
            setButtonmessage("OK")
            setLinkmodal("#")
            setClosemodal("#")
            break;
    
        case "codigoSubido":
            setModaltitle("Nuevo código contable subido")
            setButtonmessage("OK")
            setLinkmodal("#")
            setClosemodal("#")
            break;

        case "errorSubida":
            setModaltitle("Error")
            setModalmessage()
            setButtonmessage("Cerrar")
            setLinkmodal("#")
            break;
      }

  }, [modaltipo])
  

  const handleEliminar = async ()=> {
    var espera
    var editor = [user.email,user.uid]
    var tipoFicha = "eliminada"
    var modificación = Date.now()
    const idFicha = fichaModal.id+'-'+fichaModal.creado
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
        setuploadButton(false)
    }

  }


  const handleCodigo = async ()=> {
    var codcont = document.getElementById("contable").value
    var codcont = codcont.toUpperCase()
    var espera
    var verificar = verify(codcont)
    console.log(verificar)

    if (verificar === "OK"){

        var editor = [user.email,user.uid]
        var CodContable = fichaModal.CodPlanEstratégico+"1."+codcont+"."
        settextoFinal(CodContable)
        var modificación = Date.now()
        const codigoContable = {
            CodContable,
            editor,
            modificación
        }
        const idFicha = fichaModal.id+'-'+fichaModal.creado 
        setuploadButton(true)
        espera = await guardarCodigoContable(codigoContable,idFicha)
        //accion despues de subida codigo
        console.log("actualizado???")
        console.log(espera)
        if (espera === true) {
            switch (modaltipo){
                case "codigocontable":
                    setuploadButton(false)
                    setModaltipo("codigoSubido")
                break;
                case "cambiarcodigo":
                    setuploadButton(false)
                    setModaltipo("codigoCambiado")
                break;
            }
        }
       } 
        else 
        {
        let element = document.getElementById("contable");
        element.classList.add("error-class");
       }
       
    }
 
  const verify = (codcont)=> {
    var mensaje = "OK"
    if ( (/[a-zA-Z][.][0-9]/.test(codcont)) || (codcont.length === 1 && /[a-zA-Z]/.test(codcont)) ){
        console.log("codigo verificado")
    } else {
        mensaje = "revise el código ingresado"
    }
    return mensaje
  }

 

  const removeError = e => {
    console.log(e.target)
    console.log(e.target.classList.value)
    if (e.target.classList.value.indexOf("error-class") || e.target.classList.value == "error-class"){e.target.classList.remove("error-class")}
    const parentDiv = e.target.parentElement;
    const grandparentDiv = parentDiv.parentElement
    grandparentDiv.classList.remove("error-class");
  };

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

                    { buttonmessage == "OK"  ? 
                    <div className='tcenter'>{textoFinal}</div> : buttonmessage !== "Cerrar" && buttonmessage !== "ELIMINAR" && <div className='tcenter'>{fichaModal.CodPlanEstratégico}1.<input type="text" maxlength="3" className='inputCode'id='contable' onBlur={removeError}/></div> 
                    }

                    { uploadButton ? 
                        <Link to={linkmodal}><div className={`buttonModal ${buttonColor}`}><ScaleLoader color="#ffffff" height={10} margin={2} radius={0} speedMultiplier={1}/></div></Link> 
                        :
                        <Link to={linkmodal}><div className={`buttonModal ${buttonColor}`} onClick={buttonmessage == "OK" || buttonmessage == "Cerrar" ? ()=>{setVermodal(false)} : buttonmessage !== "ELIMINAR" ? ()=>handleCodigo() :  ()=>handleEliminar()}>{buttonmessage}</div></Link>
                    }
                </div>  
    </div>
  )
}

export default ModalCodigo

//setVermodal(true)