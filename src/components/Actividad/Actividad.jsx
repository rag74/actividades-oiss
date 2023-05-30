import { useEffect, useState } from "react"
import './Actividad.css'
import { useUserAuth } from "../../context/UserAuthContext"

function Actividad({nivelUsuarioS}) {

  const [tipo, setearTipo] = useState("") 
  const [organizador, setearOrganizador] = useState("")
  

  var arr = []
  const {destinatarios,iberoamerica,codigosPlan, verify} = useUserAuth()
  console.log("DESTINATARIOS")
  console.log(destinatarios)
  console.log(iberoamerica)
  console.log(codigosPlan)

  const [ponentes, setPonentes] = useState()
  const [participantes, setParticipantes] = useState()

  const [textareaheight, setTextareaheight] = useState(10); 
  

  useEffect(() => {
    var elem = document.getElementById("SUBtipo");
    if (tipo !== ""){
        elem.classList.remove("none")
    } else {elem.classList.add("none")}
  }, [tipo])


  const publicoDestinatario = destinatarios.map(item => (
                <div className="subPublico" key={item}>
                    <input type="checkbox" id={item} name="destinatarios" value={item}/>
                    <label htmlFor={item}>{item}</label>
                </div>
                ))

   const paisesIberoamericanos = iberoamerica.map(item=>(
        <option value={item}>{item}</option>
   ))

   const contribuciones = codigosPlan.map(item=>(
        <option key={item.cod} value={[item.cod,item.desc]}>{item.cod} {item.desc}</option>
   ))


//*//// LIMITAR FECHA FINAL
const handleFinalDate = (e)=> {
    console.log(e)
    document.getElementById('fechafinal').setAttribute("min", e);
}
//*////////////////

//**/// ORGANIZADOR - SETEAR CENTRO 
const handleCentro = (e)=> {
    if (e == "OISS" ) {
       console.log(nivelUsuarioS.centro) 
       document.getElementById("organizadorDetalle").value = nivelUsuarioS.centro
       document.getElementById("organizadorDetalle").readOnly = true
    } else {
        document.getElementById("organizadorDetalle").readOnly = false
        document.getElementById("organizadorDetalle").value = ""
    }
}

//*/////////////


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
        const rowHeight = 15; 
        const trows = Math.ceil(height / rowHeight) - 2; 
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

    if (clase == "pone"){setPonentes(arr)} else (setParticipantes(arr))
}

const handleCont = (ev)=> {console.log(ev)}

const handleSubir = (ponentes, participantes)=> {
    
    verify(ponentes, participantes)
    var a = verify()
    //if (a == 1){console.log("todo perfecto")}else{console.log("todo mal")}
    console.log(verify())
}
    
  return (
    <div className="contenedor actividad"> 

        <h3>Información general</h3>

        <label for="titulo">Título de la actividad</label>
        <input type="text" name="titulo" id="titulo" onBlur={(e)=>{}}/>

        <div className="separador"/>

        <div className="tipologia">
            <div className="subTipologia" id="">
                <label htmlFor="tipo" className="">Tipo</label>
                <select name="tipo" id="tipo" className="tipoOne" onChange={(e)=> {setearTipo(e.target.value)}}>
                    <option value="">Elija un tipo de actividad</option>
                    <option value="A">Asesoramiento</option>
                    <option value="C">Comunicación</option>
                    <option value="E">Evento</option>
                    <option value="F">Formación</option>
                    <option value="P">Producto</option>
                </select>
            </div>
            <div className="subTipologia none" id="SUBtipo">
                <label htmlFor="subtipo" className="">Subtipo</label>
                <select name="subtipo" id="subtipo" className="" onChange={(e)=> {}} >
                    
                    { tipo == "A" && 
                        <> 
                        <option value="">Elija un subtipo</option>
                        <option value="Asistencia técnica">Asistencia técnica</option>
                        <option value="OtrosC">Otros</option>
                        </>
                    }

                    { tipo == "C" && 
                        <>
                        <option value="">Elija un subtipo</option>
                        <option value="Newsletter">Newsletter</option>
                        <option value="Portal">Portal</option>
                        <option value="Redes Sociales">Redes Sociales</option>
                        <option value="Formación">Formación</option>
                        <option value="Rueda de prensa">Rueda de prensa</option>
                        <option value="Web OISS">Web OISS</option>
                        <option value="Otros">Otros</option>
                        </>
                    }

                    { tipo == "E" && 
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
                        <option value="Otros">Otros</option>
                        </>
                    }

                    { tipo == "F" && 
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

                    { tipo == "P" && 
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
                <select name="formatoTipo" id="formato" className="" onChange={(e)=> {}}>
                        <option value="">Elija un elemento</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Virtual sincrónica">Virtual sincrónica</option>
                        <option value="Virtual asincrónica">Virtual asincrónica</option>
                        <option value="Híbrida (retransmisión en directo)">Híbrida (retransmisión en directo)</option>
                </select>
            </div>
            <div className="subFormato small">
                <label htmlFor="formatoFecha" className="">Inicio</label>
                <input type="date" id="fechainicio" name="" onChange={(e)=>handleFinalDate(e.target.value)}></input>
            </div>
            <div className="subFormato small">
                <label htmlFor="formatoFecha" className="">Final</label>
                <input type="date" id="fechafinal" name="" onChange={(e)=> {}}></input>
            </div>
            <div className="subFormato w50 pr-5">
             <label htmlFor="localidad" className="">Localidad</label>
             <input type="text" name="localidad" id="localidad" onBlur={(e)=>{}}/>
            </div>
            <div className="subFormato w50 pr-5">
                <label htmlFor="país" className="">País</label>
                <select name="país" id="país" className="" onChange={(e)=> {}}>
                    <option value="">Elija un elemento</option>
                    {paisesIberoamericanos}
                
                </select>
            </div>

        </div>
        
        <div className="separador"/>

        <div className="organiza">
            <div className="subOrganiza w40">
                <label htmlFor="organizador" className="">Organiza</label>
                <select name="organizador" id="organizador" className="" onChange={(e)=>{handleCentro(e.target.value)}}>
                        <option value="">Elija un elemento</option>
                        <option value="OISS">OISS</option>
                        <option value="Otra entidad (especifique) ">Otra entidad (especifique) </option>
                </select>
            </div>

            <div className="subOrganiza fill">
                <label htmlFor="masDetalle" className="">Más detalles</label>
                <input type="text" name="masDetalle" id="organizadorDetalle" onBlur={(e)=>{}}/>
            </div>

            <div className="subOrganiza w50">
                <label htmlFor="cofinanciadora" className="">Entidad co-financiadora</label>
                <input type="text" name="cofinanciadora" id="cofinanciadora" onBlur={(e)=>{}}/>
            </div>

            <div className="subOrganiza fill">
                <label htmlFor="enlaceActividad" className="">Enlace de la actividad</label>
                <input type="text" name="enlaceActividad" id="enlaceActividad" onBlur={(e)=>{}}/> 
            </div>
            
        </div>

        <div className="separador"/>

        <h3>Información complementaria</h3>
            <p>Publico destinantario</p>
            <div className="publico">
                
                {publicoDestinatario}
        
            </div>
             <button onClick={contar}>contar</button>
            <div className="separador"/>

        <div className="participantes">
            
            <div className="subParticipantes w50">
            <p>Nro. de participantes</p>
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
                    <input type="number" name="partTotal" id="partTotal" className="w20" disabled/> Total
                </label>
            </div>
            <div className="subParticipantes w50">
                <p>Nro. de ponentes</p>
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
                    <input type="number" name="poneTotal" id="poneTotal" className="w20" disabled/> Total
                </label>
            </div>

        </div>   

        <div className="separador"/>

        <div className="enfoque">
            <div className="subEnfoque w50">
                <p>Contribución al Plan Estratégico 2020-2023</p>
                <select name="contPlan" id="planEstratégico" onChange={(ev)=> {handleCont(ev.target.value)}} className="selectPlan"  >
                    <option value="">Elija un elemento</option>
                    {contribuciones}
                </select>
                <div className="separador"/>
                <p>Enfoques transversales</p>
                <div className="subSubEnfoque">
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
            <div className="subEnfoque w50">
                <p>Fuentes de verificación adjuntadas:</p>
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
        <div className="separador"/>
        <p>Descripción de la actividad realizada:</p>
        <textarea name="textarea" rows={textareaheight} width="100%" onChange={handleChange} className="textDesc" id="descripción" placeholder="
        - Breve contextualización de la actividad (qué ha motivado su realización)

        - Objetivos de la actividad 

        - Principales resultados de la actividad"
            >
        </textarea>
        <div className="separador"/>
        <button onClick={()=>handleSubir(ponentes, participantes)}>ENVIAR</button>
    </div>
    )
}

export default Actividad