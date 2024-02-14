import { useEffect, useState } from "react"
import './Actividad.css'
import { useUserAuth } from "../../context/UserAuthContext"
import { Link, useParams , useNavigate , useLocation } from "react-router-dom";
import Updating from "../Updating/Updating";
import ModalStandard from "../ModalStandard/ModalStandard";

function Actividad({nivelUsuarioS,ID, user, REG, recupero,loading}) {
   

  const {destinatarios,iberoamerica,codigosPlan,OISSCentro, OISSViñetas, verify, generarFicha, guardarFicha, prellenar} = useUserAuth()
  
  const [update, setUpdate] = useState(false)
  const [vermodal, setVermodal] = useState(false)
  const [modaltipo, setModaltipo] = useState()
  const [tipoerror, setTipoerror] = useState()

  useEffect(() => {
    if (recupero!=null){
        prellenar(recupero,setearTipo,setOrga)
        contarPartPone("part", "partTotal")
        contarPartPone("pone", "poneTotal")
    }
    else {
        setPonentes([0,0,0,0])
        setParticipantes([0,0,0,0])
    }
  }, [recupero])
  
  console.log("IMPORTACIONES ACTIVIDAD")

  const navigate = useNavigate()
  const currentRoute = useLocation().pathname;

  const [tipo, setearTipo] = useState("") 
  const [organizador, setearOrganizador] = useState("")
  const [ponentes, setPonentes] = useState()
  const [participantes, setParticipantes] = useState()

  const [textareaheight, setTextareaheight] = useState(10);
  const [orga, setOrga] =  useState();
  var arr = []
  

  useEffect(() => {
    var elem = document.getElementById("SUBtipo");
    if (tipo !== ""){
        elem.classList.remove("none")
    } else {elem.classList.add("none")}
  }, [tipo])



  const goBack = () => {
    navigate(-1);}


  const publicoDestinatario = destinatarios.map(item => (
                <div className="subPublico" key={item}>
                    <input type="checkbox" id={item} name="destinatarios" value={item}/>
                    <label htmlFor={item}>{item}</label>
                </div>
                ))

   const paisesIberoamericanos = iberoamerica.map(item=>(
        <option key={item} value={item}>{item}</option>
   ))

   const contribuciones = codigosPlan.map(item=>(
        <option key={item.cod} value={[item.cod,item.desc]}>{item.cod} {item.desc}</option>
   ))

   const centroOrganizador = OISSViñetas.map(item=>(
    <option key={item.sigla} value={[item.centro]}>{item.centro}</option>
    ))

//*//// LIMITAR FECHA FINAL
const handleFinalDate = (e)=> {
    console.log(e)
    document.getElementById('fechafinal').setAttribute("min", e);
}
//*////////////////


//*//////HANDLE TRANSVERSALES
const handleTransversales = (value)=> {
    var long = document.querySelectorAll("input[name=transversales]:checked")
    //*console.log(e)
    //*console.log(long.length)

    for (var i=0;i<long.length;i++ ){
        if (long[i].value != value){long[i].checked=false}
    }

}

//*//// EXTENDER TEXTAREA AUTOMATICO////// 

   function handleChange(event) { 
        const height = event.target.scrollHeight; 
        const rows = event.target.rows; 
        const rowHeight = 20; 
        const trows = Math.ceil(height / rowHeight) - 1; 
        console.log(height, rows, trows);  

        if (trows > rows) { 
        
            console.log((trows - rows) + ' more rows'); 
            setTextareaheight(trows)
            
        } 
  } 


//CREAR ARRAYS DEL CHECKBOX
const contar = ()=>{
    arr = Array.from(document.querySelectorAll("input[name=destinatarios]:checked")).map((elem) => elem.value)
    console.log(arr)       
    }
    
//CONTAR PARTICIPANTES

const contarPartPone = (clase, final)=> {
    console.log(clase, final)
    arr = Array.from(document.querySelectorAll("input[name="+clase+"]")).map((elem) => elem.value).map(i=>Number(i));
    var count = 0;
        for(var i=0, n=arr.length; i < n; i++) 
        { 
        count += arr[i]; 
        }
    console.log(count)
    arr.push(count)
    console.log(arr)
    document.getElementById(final).value=count;

    if (clase === "pone"){setPonentes(arr)} else (setParticipantes(arr))
}

const handleCont = (ev)=> {console.log(ev)}


const handleSubir = async (ponentes, participantes, tiposubida,llave)=> {

    console.log(llave)
    if (llave) {
        recupero = null
        console.log("recupero:")
        console.log(recupero)
    }
    
    var ficha = generarFicha(ponentes, participantes, tiposubida, user, REG, recupero)
    
    var verificar = verify(ficha)

    if (verificar === "OK") {
        setUpdate(true)
        setModaltipo("fichaGuardada")
        await guardarFicha(ficha)
        setUpdate(false)
        console.log(ficha)
        setVermodal(true)
        } else {
            setModaltipo("errorSubida")
            setUpdate(false)
            setTipoerror(verificar)
            setVermodal(true)
        }
}

const handleElim = ()=> {
    setModaltipo("eliminar")
    setVermodal(true)
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
     
    <div className="contenedor actividad">
        {loading ? <h1>Cargando...</h1> : 
        <>

            <div>
                {currentRoute.includes("control") ? <h2>Edición de ficha</h2> : <h2>Nueva ficha</h2>}
            </div>

        <div className="panel-header">
            <Link onClick={() => navigate(-1)} to="/"><div class="buttonNew ml-0"><i class="fa-solid fa-arrow-left"></i></div></Link>
        </div>


        <h3>Información general</h3> 

        <label for="titulo">Título de la actividad</label>
        <input type="text" name="titulo" id="titulo" onBlur={removeError} />

        <div className="separador"/>

        <div className="tipologia">
            <div className="subTipologia" id="">
                <label htmlFor="tipo" className="">Tipo</label>
                <select name="tipo" id="tipo" className="tipoOne" onChange={(e)=> {setearTipo(e.target.value)}} onBlur={removeError} >
                    <option value="">Elija un tipo de actividad</option>
                    <option value="Asesoramiento">Asesoramiento</option>
                    <option value="Comunicación">Comunicación</option>
                    <option value="Evento">Evento</option>
                    <option value="Formación">Formación</option>
                    <option value="Producto">Producto</option>
                </select>
            </div>
            <div className="subTipologia none" id="SUBtipo">
                <label htmlFor="subtipo" className="">Subtipo</label>
                <select name="subtipo" id="subtipo" className="" onChange={(e)=> {}} onBlur={removeError} >
                    
                    {tipo == "Asesoramiento" && 
                        <> 
                        <option value="">Elija un subtipo</option>
                        <option value="Asistencia técnica">Asistencia técnica</option>
                        <option value="Reunión">Reunión</option>
                        <option value="Otros">Otros</option>
                        </>
                    }

                    { tipo == "Comunicación" && 
                        <>
                        <option value="">Elija un subtipo</option>
                        <option value="Campañas">Campañas</option>
                        <option value="Newsletter">Newsletter</option>
                        <option value="Portal">Portal</option>
                        <option value="Redes Sociales">Redes Sociales</option>
                        <option value="Rueda de prensa">Rueda de prensa</option>
                        <option value="Web OISS">Web OISS</option>
                        <option value="Otros">Otros</option>
                        </>
                    }

                    { tipo == "Evento" && 
                        <>
                        <option value="">Elija un subtipo</option>
                        <option value="Asamblea">Asamblea</option>
                        <option value="Asamblea Extraordinaria">Asamblea Extraordinaria</option>
                        <option value="Comisión Directiva">Comisión Directiva</option>
                        <option value="Comité Técnico adtivo CMISS">Comité Técnico adtivo CMISS</option>
                        <option value="Conferencia">Conferencia</option>
                        <option value="Congreso">Congreso</option>
                        <option value="Encuentro">Encuentro</option>
                        <option value="Foro">Foro</option>
                        <option value="Grupo de Trabajo">Grupo de Trabajo</option>
                        <option value="Ponencia">Ponencia</option>
                        <option value="Reunión">Reunión</option>
                        <option value="Simposio">Simposio</option>
                        <option value="Otros">Otros</option>
                        </>
                    }

                    { tipo == "Formación" && 
                        <>        
                        <option value="">Elija un subtipo</option>
                        <option value="Curso">Curso</option>
                        <option value="Intercambio buenas prácticas">Intercambio buenas prácticas</option>
                        <option value="Seminario">Seminario</option>
                        <option value="Taller">Taller</option>
                        <option value="Virtual sincrónica">Virtual sincrónica</option>
                        <option value="Virtual asincrónica">Virtual asincrónica</option>
                        <option value="Visita de estudio">Visita de estudio</option>
                        <option value="Otros">Otros</option>
                        </>
                    }

                    { tipo == "Producto" && 
                        <>  
                        <option value="">Elija un subtipo</option>
                        <option value="Acta">Acta</option>
                        <option value="Boletín">Boletín</option>
                        <option value="Declaración">Declaración</option>
                        <option value="Guía">Guía</option>
                        <option value="Estudio">Estudio</option>
                        <option value="Informe observatorio">Informe observatorio</option>
                        <option value="Informe">Informe</option>
                        <option value="Premio">Premio</option>
                        <option value="Protocolo">Protocolo</option>
                        <option value="Video">Video</option>
                        <option value="Otros">Otros</option>
                        </>
                    }

                </select>
            </div>
        </div>

        <div className="formato">
            <div className="subFormato">
                <label htmlFor="formatoTipo" className="">Formato</label>
                <select name="formatoTipo" id="formato" className="" onChange={(e)=> {}} onBlur={removeError} >
                        <option value="">Elija un elemento</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Virtual sincrónica">Virtual sincrónica</option>
                        <option value="Virtual asincrónica">Virtual asincrónica</option>
                        <option value="Híbrida (retransmisión en directo)">Híbrida (retransmisión en directo)</option>
                        <option value="Mixto (presencial + virtual)">Mixto (presencial + virtual)</option>
                </select>
            </div>
            <div className="subFormato small">
                <label htmlFor="formatoFecha" className="">Inicio</label>
                <input type="date" id="fechainicio" name="" onChange={(e)=>handleFinalDate(e.target.value)} onBlur={removeError} ></input>
            </div>
            <div className="subFormato small">
                <label htmlFor="formatoFecha" className="">Final</label>
                <input type="date" id="fechafinal" name="" onChange={(e)=> {}} onBlur={removeError} ></input>
            </div>
            <div className="subFormato w50 pr-5">
             <label htmlFor="localidad" className="">Localidad</label>
             <input type="text" name="localidad" id="localidad" onBlur={removeError}/>
            </div>
            <div className="subFormato w50 pr-5">
                <label htmlFor="país" className="">País</label>
                <select name="país" id="país" className="" onChange={(e)=> {}} onBlur={removeError} >
                    <option value="">Elija un elemento</option>
                    {paisesIberoamericanos}
                
                </select>
            </div>

        </div>
        
        <div className="separador"/>

        <div className="organiza">
            <div className="subOrganiza w20">
                <label htmlFor="organizador" className="">Organiza</label>
                <select name="organizador" id="organizador" className="" onChange={(e)=>{setOrga(e.target.value)}} onBlur={removeError} >
                        <option value="">Elija un elemento</option>
                        <option value="OISS">OISS</option>
                        <option value="Otra entidad (especifique)">Otra entidad (especifique)</option>
                </select>
            </div>

                { orga == "OISS" ? 
                 <> 
                    <div className="subOrganiza w40">
                        <label htmlFor="masDetalle" className="">Lidera</label>
                        <select type="text" name="masDetalle" id="organizadorDetalle" onBlur={removeError}>
                            <option value="">Elija un elemento</option>
                            {centroOrganizador}
                        </select>
                    </div>
                    <div className="subOrganiza fill">
                        <label htmlFor="masDetalle" className="">Apoya</label>
                        <select type="text" name="apoya" id="organizadorApoya" onBlur={removeError} >
                            <option value="">Elija un elemento</option>
                            {centroOrganizador}
                        </select>
                    </div>
                 </>  
                        :

                    <div className="subOrganiza w60 fill">
                        <label htmlFor="masDetalle" className="">Más detalles</label>
                        <input type="text" name="masDetalle" id="organizadorDetalle" onBlur={removeError} />
                    </div>
                 }
                
            <div className="subOrganiza w50">
                <label htmlFor="cofinanciadora" className="">Entidad co-financiadora</label>
                <input type="text" name="cofinanciadora" id="cofinanciadora" onBlur={removeError} />
            </div>

            <div className="subOrganiza fill">
                <label htmlFor="enlaceActividad" className="">Enlace de la actividad</label>
                <input type="text" name="enlaceActividad" id="enlaceActividad" onBlur={removeError} /> 
            </div>
            
        </div>

        <div className="separador"/>

        <h3>Información complementaria</h3>
            <p>Publico destinantario</p>
            <div className="publico" id="publico" onClick={(e)=>{removeError(e)}}>
                
                {publicoDestinatario}
        
            </div>

            <div className="separador"/>

        <div className="participantes">
            
            <div className="subParticipantes w50">
            <p>Nro. de participantes</p>
             <div id="participantes" onClick={(e)=>{removeError(e)}}>
                <label for="partMujeres">
                    <input type="number" name="part" id="partMujeres" min="0" defaultValue="0" className="nroPart w20" onChange={(e)=> {contarPartPone("part", "partTotal")}}/> Nro. de mujeres
                </label>
                <label for="partHombres">
                    <input type="number" name="part" id="partHombres" min="0" defaultValue="0" className="nroPart w20" onChange={(e)=> {contarPartPone("part", "partTotal")}}/> Nro. de hombres
                </label>
                <label for="partOtros">
                    <input type="number" name="part" id="partOtros" min="0" defaultValue="0" className="nroPart w20" onChange={(e)=> {contarPartPone("part", "partTotal")}}/> Nro. de otros
                </label>
                <label for="partTotal">
                    <input type="number" name="partTotal" id="partTotal" className="w20" defaultValue="0" disabled onChange={removeError}/> Total
                </label>
             </div>
            </div>
            <div className="subParticipantes w40 ml-10">
                <p>Nro. de ponentes</p>
                <div id="ponentes" onClick={(e)=>{removeError(e)}}>
                <label for="ponentesMujeres">
                    <input type="number" name="pone" id="ponentesMujeres" min="0" defaultValue="0" className="nroPone w20" onChange={(e)=> {contarPartPone("pone", "poneTotal")}}/> Nro. de mujeres
                </label>
                <label for="ponentesHombres">
                    <input type="number" name="pone" id="ponentesHombres" min="0" defaultValue="0" className="nroPone w20" onChange={(e)=> {contarPartPone("pone", "poneTotal")}}/> Nro. de hombres
                </label>
                <label for="ponentesOtros">
                    <input type="number" name="pone" id="ponentesOtros" min="0" defaultValue="0" className="nroPone w20" onChange={(e)=> {contarPartPone("pone", "poneTotal")}}/> Nro. de otros
                </label>
                <label for="ponentesTotal">
                    <input type="number" name="poneTotal" id="poneTotal" className="w20" defaultValue="0" disabled onChange={removeError}/> Total
                </label>
                </div>
            </div>

        </div>   

        <div className="separador"/>

        <div className="enfoque">
            <div className="subEnfoque w50">
                <p>Contribución al Plan Estratégico 2020-2023</p>
                <select name="contPlan" id="planEstratégico" className="selectPlan" onChange={(ev)=> {handleCont(ev.target.value)}} onClick={removeError} >
                    <option value="">Elija un elemento</option>
                    {contribuciones}
                </select>
                <div className="separador"/>
                <p>Enfoques transversales</p>
                <div id="enfoque" onClick={(e)=>{removeError(e)}}>
                <div className="subSubEnfoque" >
                <input type="checkbox" id="Enfoque de Derechos Humanos" name="transversales" value="Enfoque de Derechos Humanos" onChange={(e)=>{handleTransversales(e.target.value)}} />
                <label htmlFor="Enfoque de Derechos Humanos">Enfoque de Derechos Humanos</label>
                </div>
                <div className="subSubEnfoque">
                <input type="checkbox" id="Enfoque de Género" name="transversales" value="Enfoque de Género" onChange={(e)=>{handleTransversales(e.target.value)}}/>
                <label htmlFor="Enfoque de Género">Enfoque de Género</label>
                </div>
                <div className="subSubEnfoque">
                <input type="checkbox" id="Espacio accesible" name="transversales" value="Espacio accesible" onChange={(e)=>{handleTransversales(e.target.value)}}/>
                <label htmlFor="Espacio accesible">Espacio accesible</label>
                </div>
                <div className="subSubEnfoque">
                <input type="checkbox" id="Huella de carbono reducida" name="transversales" value="Huella de carbono reducida" onChange={(e)=>{handleTransversales(e.target.value)}}/>
                <label htmlFor="Huella de carbono reducida">Huella de carbono reducida</label>
                </div>
                </div>
            </div>
            <div className="subEnfoque w50 pl-10">
                <p>Fuentes de verificación adjuntadas:</p>
                <div id="fuentes" onClick={(e)=>{removeError(e)}}>
                    <div className="subSubEnfoque">
                    <input type="checkbox" id="Encuestas" name="fuentes" value="Encuestas" />
                    <label htmlFor="Encuestas">Encuestas</label>
                    </div>
                    <div className="subSubEnfoque">
                    <input type="checkbox" id="Fotografías" name="fuentes" value="Fotografías"/>
                    <label htmlFor="Fotografías">Fotografías</label>
                    </div>
                    <div className="subSubEnfoque">
                    <input type="checkbox" id="Informes" name="fuentes" value="Informes"/>
                    <label htmlFor="Informes">Informes</label>
                    </div>
                    <div className="subSubEnfoque">
                    <input type="checkbox" id="Listado asistencia" name="fuentes" value="Listado asistencia"/>
                    <label htmlFor="Listado asistencia">Listado asistencia</label>
                    </div>
                    <div className="subSubEnfoque">
                    <input type="checkbox" id="Material gráfico y/o impreso" name="fuentes" value="Material gráfico y/o impreso"/>
                    <label htmlFor="Material gráfico y/o impreso">Material gráfico y/o impreso</label>
                    </div>
                    <div className="subSubEnfoque">
                    <input type="checkbox" id="Nota de prensa" name="fuentes" value="Nota de prensa"/>
                    <label htmlFor="Nota de prensa">Nota de prensa</label>
                    </div>
                    <div className="subSubEnfoque">
                    <input type="checkbox" id="Programa" name="fuentes" value="Programa"/>
                    <label htmlFor="Programa">Programa</label>
                    </div>
                    <div className="subSubEnfoque">
                    <input type="checkbox" id="Vaciado de prensa" name="fuentes" value="Vaciado de prensa"/>
                    <label htmlFor="Vaciado de prensa">Vaciado de prensa</label>
                    </div>
                </div>
            </div>
        </div>
        <div className="separador"/>
        <p>Descripción de la actividad realizada:</p>
        <textarea name="textarea" rows={textareaheight} width="100%" onChange={handleChange} onBlur={removeError} className="textDesc" id="descripción" placeholder="
        - Breve contextualización de la actividad (qué ha motivado su realización)

        - Objetivos de la actividad 

        - Principales resultados de la actividad"
            >
        </textarea>
        <div className="separador"/>
        
        <div className="buttonControls">
           { !recupero &&
            <button className="mr-5" onClick={()=>handleSubir(ponentes, participantes, "publicada")}>Guardar</button>}

            { recupero && 
            <>
            <button className="mr-5" onClick={()=>handleSubir(ponentes, participantes, "publicada")}>Guardar cambios</button>
            <button className="mr-5 pink" onClick={()=>{handleElim()}}>Eliminar</button>
            </>
            }
            <button className="mr-5"onClick={goBack}>Salir sin guardar</button>
            <button className="mr-5" onClick={()=>handleSubir(ponentes, participantes, "publicada",1)}>Guardar LLAVE MAESTRA</button>

            
        </div>


        {vermodal && <ModalStandard ID = {ID} modaltipo = {modaltipo} tipoerror = {tipoerror} setVermodal = {setVermodal} REG = {REG} user = {user} recupero = {recupero}/>}
        {update && <Updating/>}

        </>}
    </div>            
  )
}

export default Actividad