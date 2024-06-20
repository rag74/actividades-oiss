import React, { useState , useEffect } from "react";
import './ListadoActividades.css';
import {useUserAuth} from '../../context/UserAuthContext';
import { collection, query, getDoc, getDocs, where, doc } from "firebase/firestore";
import { Link, useParams , useNavigate} from "react-router-dom";
import db from '../../firebase';
import ModalCodigo from "../ModalCodigo/ModalCodigo";


function ListadoActividades({nivelUsuarioS,user,REG,fichas,loading,codigosPlan}) {

    console.log("print listadoactividades")
    console.log(REG)
    console.log (nivelUsuarioS)
    console.log (nivelUsuarioS.userUI)
    console.log (fichas)
    console.log("print listadoactividades USER")
    console.log(user)
    console.log(user.uid)
    const {OISSCentro, arrayToCsv, download} = useUserAuth()
    
    //////MODAL/////
    const [verModal, setVermodal] = useState(false)
    const [modaltipo, setModaltipo] = useState()
    const [fichaModal, setfichaModal] = useState()
    const [fichasElegidas, setfichasElegidas] = useState(fichas)

    const handleAsignar = (ficha,tipo)=> {
        //alert("asignar "+id+"-"+creado+" - "+string+" - "+tipo)
        setModaltipo(tipo)
        setfichaModal(ficha)
        setVermodal(true)
    }

    const handDuplicate = (valor)=>{
        let veces = 0;
        for (const objeto of fichasElegidas) {
            if (objeto.CodContable === valor) {
            veces++;
            }
            }

        console.log(fichasElegidas)
        console.log(valor)
        console.log(veces)  
        return veces                 
    }
    
    
function timestampToDate(timestamp) {
        const date = new Date(timestamp) 
        // Format the date string in the desired format.
        let day = date.getDate()
        let month = date.getMonth();
        month = (month + 1)
        let year = date.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }
        
        if (month < 10) {
            month = `0${month}`;
        }
        
        let formattedDate = `${day}-${month}-${year}`;
       // 23-07-2022

        return formattedDate
}

const arrHeader = [
    { label: "Fecha Creación", key: "creado" },
    { label: "Delegación", key: "delegación" },
    { label: "Título", key: "titulo" },
    { label: "Creador", key: "creador" },
    { label: "Código Plan Est.", key: "devCodPlanEstratégicoName" },
    { label: "Desc. Plan Est.", key: "DescPlanEstratégico" },
    { label: "Plan Estratégico", key: "planEstratégico" },
    { label: "Fecha inicio", key: "fechainicio" },
    { label: "Fecha fin", key: "fechafinal" },
    { label: "Tipo de actividad", key: "tipo" },
    { label: "Subtipo", key: "subtipo" },
    { label: "Organizador", key: "organizadorDetalle" },
    { label: "Organizador2", key: "organizador" },
    { label: "Cofinanciador", key: "cofinanciadora" },
    { label: "Localidad", key: "localidad" },
    { label: "País", key: "país" },
    { label: "Enlace de Actividad", key: "enlaceActividad" },
    { label: "Destinatarios", key: "destinatarios" },
    { label: "Enfoque transversal", key: "enfoque" },
    { label: "Fromato", key: "formato" },
    { label: "Fuentes", key: "fuentes" },
    { label: "Descripción", key: "descripción" },
    { label: "Participantes", key: "participantes" },
    { label: "Ponentes", key: "ponentes" },
    { label: "Estado de ficha", key: "tipoFicha" },
    { label: "ID", key: "id" },
    { label: "Editor", key: "editor" },
    { label: "Fecha edición", key: "modificación" },
   ];



   const generateCSV=(header, data, filename)=>{
    const csvData=arrayToCsv(header,data);
    download(csvData,filename);
    };

  return (
    <>
    {verModal && <ModalCodigo modaltipo = {modaltipo} setVermodal = {setVermodal} fichaModal = {fichaModal} fichas = {fichas} REG ={REG} user={user} setModaltipo={setModaltipo} />}

    <h2 className="mb-10">Listado de Actividades {OISSCentro[REG]}</h2>
    <div className="panel-header fijo-menu mt-5">
            <Link to={`/panel`}><div class="buttonNew ml-0"><i class="fa-solid fa-arrow-left"></i></div></Link>
            <Link to={`/nuevaficha/${REG}`}><div class="buttonNew ml-0">Nueva ficha</div></Link>
        {fichas.length > 0 &&
            <>
            <Link to={`/cuadro/${REG}`}><div class="buttonNew ml-0">Cuadro</div></Link>
            <Link to={`/stats/${REG}`}><div class="buttonNew ml-0">Estadísticas</div></Link>
            </>
        }
    </div>

    <div className="listado">
            <h4 className=" mt-10 mb-5">Fichas corregir</h4>
                <div className="headRow">
                        <span className='estado'>Código</span>
                        <span className='titulo'>Título de la actividad</span>
                        <span className='auto'>Autor</span>
                        <span className='editor1'>Editor</span>
                        <span className='fecha'>Fecha</span>
                        <span className='accion'></span>
                </div>
    
    {fichas?.map((ficha) => (
                        <>
                        <div key={ficha.creado} className={`fileRow ${ficha.creador[1] == nivelUsuarioS.userUID && "aliceBlue"}`} >
                            <span className="estado hov" draggable>{ficha.CodContable != "S/C" ? <div onClick={nivelUsuarioS.nivel==1 ? ()=>handleAsignar(ficha,"cambiarcodigo"): ()=>{}}><p className={`${handDuplicate(ficha.CodContable) > 1 && "pink fl"}`}>{ficha.CodContable}</p></div> : <div className={`badjeRow black ${nivelUsuarioS.nivel==1 && "hov"}`} onClick={nivelUsuarioS.nivel==1 ? ()=>handleAsignar(ficha,"codigocontable"): ()=>{}}>sin asignar</div>}</span>

                            <span className='titulo'>{ficha.titulo} { (nivelUsuarioS.nivel ==1) && <span className="badjeRow green hov">NC</span>}</span>

                            <span className='auto'>{ficha.creador[0]}</span>
                            <span className='editor1'>{ficha.editor[0]}</span>
                            <span className='fecha'>{ficha.modificación ? timestampToDate(ficha.modificación) : timestampToDate(ficha.creado)}</span>
                            <span className='revisar'>
                                <Link to={`/ficha/${REG}/${ficha.id}-${ficha.creado}`}><button className='buttonRow mr-5'>ver</button></Link>
                                
                                { (nivelUsuarioS.nivel ==1 || nivelUsuarioS.administrador || ficha.creador[1] == nivelUsuarioS.userUID /*user.uid*/) &&
                                <Link to={`/control/${REG}/${ficha.id}-${ficha.creado}`}><button className='buttonRow mr-5'>editar</button></Link>
                                    }
                                    
                                { (nivelUsuarioS.nivel == 1 || nivelUsuarioS.administrador) &&
                                <button className='buttonRow pink' onClick={()=>{handleAsignar(ficha,"eliminar")}} >eliminar</button>
                                    }
                                {/*<button className='buttonRow' onClick={()=>{}} >{ficha.delegación}</button>*/}

                                
                            </span>
                        </div>
                        </>
                    ))}
            <div className="mb-10"/>
                
        </div>

    <div className="mb-10">
        { (nivelUsuarioS.administrador || nivelUsuarioS.nivel == 1)  && fichas.length > 0 &&
        <button onClick={()=>generateCSV(arrHeader, fichas, "fichasCSV")}>Bajar CSV</button>
            }
    </div>

    {fichas.length == 0 &&
        <div className="sinFichas">
            <h3>No se han subido fichas de actividades para este Centro o Delegación.</h3>
        </div>        
    }
    </>
  )
}

export default ListadoActividades


/*




    const handDup = (valor)=>{
        var index = fichasElegidas.indexOf(valor)
        console.log(fichasElegidas)
        console.log(valor)
        console.log(index)                    
    }
*/