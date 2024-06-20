import React, { useState, useEffect } from 'react'
import './FichaImpresión.css'
import {useUserAuth} from '../../context/UserAuthContext';
import { Link, useNavigate } from 'react-router-dom';



function FichaImpresión({nivelUsuarioS,user,REG,recupero,loading}) {

   
 const {timestampToDate} = useUserAuth()
 const [checkbox, setCheckbox] = useState(false)

 const navigate = useNavigate()

 const goBack = () => {
   navigate(-1);}

 const arrays = [recupero.tipo,recupero.destinatarios,recupero.enfoque,recupero.fuentes,recupero.organizador];

 const uniqueArray = arrays.reduce((acc, element) => acc.concat(element), []);

 console.log(uniqueArray)
  
 setTimeout(() => { checkCheckboxes(uniqueArray); }, 5);

useEffect(() => {
    setTimeout(() => { seeCheck(); }, 2);  
}, [])

function seeCheck() {
   let check = document.getElementById("OISS")
   if (check.checked){setCheckbox(true)} 
}


 
 console.log("FICHAIMPRESION")
 console.log(recupero)


const checkCheckboxes = (ids)=>{
    // Get all the checkbox elements
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
  
    // Iterate over the checkboxes
    for (const checkbox of checkboxes) {
      // Check if the checkbox id is in the array
      if (ids.includes(checkbox.id)) {
        // Check the checkbox
        checkbox.checked = true;

      }
      checkbox.classList.add("noclick")
    }
  }



  return (
    <>

    <div className='ficha'>
    <div className="panel-header">
    <Link onClick={() => navigate(-1)} to="/"><div class="buttonNew ml-0"><i class="fa-solid fa-arrow-left"></i></div></Link>
    {recupero.tipoFicha === "encurso" && <p className='avisoEncurso'>(Aviso: esta actividad está en curso, su ficha puede no estar  completa totalmnente)</p>}
    </div>
        <h1>Ficha de Actividad</h1>
        <div className='ficha-info mt-10'>
            <p>Información General</p>
        </div>
        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal'>
              <p>Título de la actividad</p>
            </div>
            <div className='ficha-col remains'>
             <p>{recupero.titulo}</p>
            </div>
        </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal light-blue pr-20' style={{"height" : "166px"}}>
                <p>Tipología</p>
                <p>de la</p>
                <p>actividad:</p>
            </div>
            <div className='ficha-col br p0 pc10'>
                <div>
                    <div className='light-blue bb pl5 pt3' style={{"height" : "50px"}}>
                        <p>Codigo</p> 
                        <p>archivo</p>
                    </div>  
                    <div className='bb c pc100 ch' style={{"height" : "23.2px"}}>A</div>
                    <div className='bb c pc100 ch'style={{"height" : "23.2px"}}>C</div>
                    <div className='bb c pc100 ch' style={{"height" : "23.2px"}}>E</div>
                    <div className='bb c pc100 ch' style={{"height" : "23.2px"}}>F</div>
                    <div className='c pc100 ch' style={{"height" : "23.2px"}}>P</div>
                </div>
                
            </div>
            <div className='ficha-col br p0 pc30'>
                <div>
                    <div className='light-blue bb pl5 pt3' style={{"height" : "50px"}}>
                        <p>Tipo</p> 
                    </div>  
                    <div className='bb c pc100' style={{"height" : "23.2px"}}>
                        <input type="checkbox" name="" id="Asesoramiento" className='' />
                        <p className='pl5'>Asesoramiento</p> 
                    </div>
                    <div className='bb c pc100' style={{"height" : "23.2px"}}>
                        <input type="checkbox" name="" id="Comunicación" className='' />
                        <p className='pl5'>Comunicación</p>
                    </div>
                    <div className='bb c pc100' style={{"height" : "23.2px"}}>
                        <input type="checkbox" name="" id="Evento" className='' />
                        <p className='pl5'>Evento</p>
                    </div>
                    <div className='bb c pc100' style={{"height" : "23.2px"}}>
                        <input type="checkbox" name="" id="Formación" className='' />
                        <p className='pl5'>Formación</p>
                    </div>
                    <div className='c pc100' style={{"height" : "23.2px"}}>
                        <input type="checkbox" name="" id="Producto" className='' />
                        <p className='pl5'>Producto</p>
                    </div>
                </div> 
            </div>
            <div className='ficha-col p0 remains'>
                <div>
                    <div className='light-blue bb pl5 pt3' style={{"height" : "50px"}}>
                        <p>Subtipo</p> 
                    </div>  
                    <div className='bb c pc100 ai' style={{"height" : "23.2px"}}>
                        {recupero.tipo == "Asesoramiento" && recupero.subtipo}
                    </div>
                    <div className='bb c pc100 ai' style={{"height" : "23.2px"}}>
                         {recupero.tipo == "Comunicación" && recupero.subtipo}
                    </div>
                    <div className='bb c pc100 ai' style={{"height" : "23.2px"}}>
                        {recupero.tipo == "Evento" && recupero.subtipo}
                    </div>
                    <div className='bb c pc100 ai' style={{"height" : "23.2px"}}>
                        {recupero.tipo == "Formación" && recupero.subtipo}
                    </div>
                    <div className='c pc100 ai' style={{"height" : "23.2px"}}>
                        {recupero.tipo == "Producto" && recupero.subtipo}
                    </div>
                </div> 
            </div>
        </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal' style={{"minHeight" : "40px"}}>
              <p>Formato:</p>
            </div>
            <div className='ficha-col remains'>
             <p>{recupero.formato}</p>
            </div>
        </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal'>
              <p>Fecha de inicio:</p>
            </div>
            <div className='ficha-col remains'>
             <p>{timestampToDate(recupero.fechainicio)}</p>
            </div>
        </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal'>
              <p>Fecha fin:</p>
            </div>
            <div className='ficha-col remains'>
             <p>{timestampToDate(recupero.fechafinal)}</p>
            </div>
        </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal'  style={{"minHeight" : "46px"}}>
              <p>Lugar de realización:</p>
            </div>
            <div className='ficha-col p0 pc15'>
                <div className='bb pl5 c' style={{"height" : "23.2px"}}>
                 Localidad</div>
                 <div className='pl5 c' style={{"height" : "23.2px"}}>
                 País</div>
            </div>
            <div className='ficha-col p0 remains'>
                <div className='bb bl pl5 c' style={{"height" : "23.2px"}}>{recupero.localidad}</div>
                 <div className='bl pl5 c' style={{"height" : "23.2px"}}>{recupero.país}</div>
            </div>
        </div>

        
        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal light-blue' style={{"minHeight" : "62px"}}>
              <p>Organiza:</p>
            </div>

            <div className='ficha-col br p0 pc30'>
                <div>
                    <div className='light-blue bb' style={{"minHeight" : "15px", "minWidth" : "100%" }}></div>  
                    <div className='bb pl5 c alignT' style={{"minHeight" : "36px"}}>
                        <input type="checkbox" name="" id="OISS" className='mt-3' />
                        <p className='pl5'>OISS</p> 
                    </div>
                    <div className='pl5 c' style={{"minHeight" : "23.6px"}}>
                        <input type="checkbox" name="" id="Otra entidad (especifique)" className='' />
                        <p className='pl5'>Otra entidad (especifique)</p> 
                    </div>
                </div>
            </div>

            <div className='ficha-col p0 remains'>
                <div>
                    <div className='light-blue bb ' style={{"minHeight" : "15px"}}></div>  
                    <div className='bb pl5' style={{"minHeight" : "23.6px"}}>
                        <p className='pl5'>Lidera: {checkbox && recupero.organizadorDetalle}</p> 
                        <p className='pl5'>Apoya: {checkbox && recupero.organizadorApoya}</p>
                    </div>
                    <div className='pl5 c' style={{"minHeight" : "23.6px"}}>
                        <p className='pl5'>{!checkbox && recupero.organizadorDetalle}</p> 
                    </div>
                </div>
            </div>
        </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal' style={{"minHeight" : "40px"}}>
              <p>Entidad co-financiadora:</p>
            </div>
            <div className='ficha-col remains'>
             <p>{recupero.cofinanciadora}</p>
            </div>
        </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal' style={{"minHeight" : "40px"}}>
              <p>Enlace web de</p> 
              <p>la actividad:</p>
            </div>
            <div className='ficha-col remains'>
             <p>{recupero.enlaceActividad}</p>
            </div>
        </div>

        <div className='separador mt-10'/>
        <div className='ficha-info mt-10'>
            <p>Información complementaria</p>
        </div>

        <div className='ficha-fila-standard pc100'>
            <div className='ficha-colPrincipal' style={{"minHeight" : "200px"}}>
              <p>Público destinatario:</p>
            </div>
            <div className='ficha-col pc40 pr50'>
                <div className='c pc100 p0'>
                    <div>
                        <input type="checkbox" name="" id="Asesores/as" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Asesores/as</span>
                    </div>
                </div>
        
                <div className='c pc100 p0'>
                    <div>
                        <input type="checkbox" name="" id="Asesores/as" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Docentes academia</span>
                    </div>
                </div>

                <div className='c pc100 p0'>
                    <div>
                        <input type="checkbox" name="" id="Estudiantes" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Estudiantes</span>
                     </div>
                </div>

                <div className='c pc100 p0'>
                    <div>
                        <input type="checkbox" name="" id="Personal instituciones públicas" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Personal instituciones públicas</span>
                     </div>
                </div>

                <div className='c pc100 p0'>
                    <div>
                        <input type="checkbox" name="" id="Personal entidades sin ánimo de lucro" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Personal entidades sin ánimo de lucro</span>
                     </div>
                </div>

                <div className='c pc100 p0'>
                    <div>
                        <input type="checkbox" name="" id="Personal experto" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Personal experto</span>
                     </div>
                </div>

                <div className='c pc100 p0'>
                    <div>
                        <input type="checkbox" name="" id="Personal OISS" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Personal OISS</span>
                     </div>
                </div>

                <div className='c pc100 p0'>
                     <div>
                        <input type="checkbox" name="" id="Personal organismos internacionales" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Personal organismos internacionales</span>
                     </div>
                </div>

            </div>

            <div className='ficha-col pc50 bl pr50'>
            
            <div className='c pc100 p0'>
                     <div>
                        <input type="checkbox" name="" id="Personal sector privado" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Personal sector privado</span>
                     </div>
                </div>

            <div className='pc100 c p0'>
                    <div>
                        <input type="checkbox" name="" id="Público en general" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Público en general</span>
                     </div>
                </div>

            <div className='c pc100 p0'>
                    <div>
                        <input type="checkbox" name="" id="Representantes gubernamentales" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Representantes gubernamentales</span>
                    </div>
                </div>
        
                <div className='c pc100 p0'>
                    <div>
                        <input type="checkbox" name="" id="Representantes instituciones miembros de la OISS" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Representantes instituciones miembros de la OISS</span>
                    </div>
                </div>

                <div className='c pc100 p0'>
                    <div>
                        <input type="checkbox" name="" id="Representantes instituciones públicas" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Representantes instituciones públicas</span>
                     </div>
                </div>

                <div className='c pc100 p0'>
                    <div>
                        <input type="checkbox" name="" id="Representantes organismos internacionales" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Representantes organismos internacionales</span>
                     </div>
                </div>

                <div className='c pc100 p0'>
                    <div>
                        <input type="checkbox" name="" id="Representantes sector privado" className='mr-5 mt-3' />
                     </div>
                     <div>
                        <span className=''>Representantes sector privado</span>
                     </div>
                </div>
            </div>
        </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal' style={{"minHeight" : "40px"}}>
              <p>Número de participantes:</p>
              
            </div>
            <div className='ficha-col br p0 pc30'>
                <div className='pt3'>
                 <div className='bb c'><p>N.º total de participantes:</p></div>   
                 <div className='bb c'><p>N.º total de mujeres:</p></div>  
                 <div className='bb c'><p>N.º total de hombres:</p></div>
                 <div className=' c'><p>N.º total de otros:</p></div> 
                </div>
            </div>
            <div className='ficha-col p0 remains'>
                <div className='pt3'>
                 <div className='bb c'>{recupero.participantes[3]}</div>   
                 <div className='bb c'>{recupero.participantes[0]}</div>  
                 <div className='bb c'>{recupero.participantes[1]}</div>
                 <div className=' c'>{recupero.participantes[2]}</div> 
                </div>
            </div>
        </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal' style={{"minHeight" : "40px"}}>
              <p>Número de ponentes:</p>
              
            </div>
            <div className='ficha-col br p0 pc30'>
                <div className='pt3'>
                 <div className='bb c'><p>N.º total de ponentes:</p></div>   
                 <div className='bb c'><p>N.º total de mujeres:</p></div>  
                 <div className='bb c'><p>N.º total de hombres:</p></div>
                 <div className=' c'><p>N.º total de otros:</p></div> 
                </div>
            </div>
            <div className='ficha-col p0 remains'>
                <div className='pt3'>
                 <div className='bb c'>{recupero.ponentes[3]}</div>   
                 <div className='bb c'>{recupero.ponentes[0]}</div>  
                 <div className='bb c'>{recupero.ponentes[1]}</div>
                 <div className=' c'>{recupero.ponentes[2]}</div> 
                </div>
            </div>
        </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal' style={{"minHeight" : "40px"}}>
              <p>Contribución al Plan Estratégico 2020-2023 OISS:</p>
            </div>
            <div className='ficha-col remains'>
             {recupero.planEstratégico[0]} - {recupero.planEstratégico[1]}
            </div>
        </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal' style={{"minHeight" : "40px"}}>
              <p>Enfoques transversales:</p>
            </div>
            <div className='ficha-col remains'>
            <div className='c pc100 p0'>
                        <div>
                            <input type="checkbox" name="" id="Enfoque de Derechos Humanos" className='mr-5 mt-3' />
                        </div>
                        <div>
                            <span className=''>Enfoque de Derechos Humanos</span>
                        </div>
                    </div>
            
                    <div className='c pc100 p0'>
                        <div>
                            <input type="checkbox" name="" id="Enfoque de Género" className='mr-5 mt-3' />
                        </div>
                        <div>
                            <span className=''>Enfoque de Género</span>
                        </div>
                    </div>

                    <div className='c pc100 p0'>
                        <div>
                            <input type="checkbox" name="" id="Espacio accesible" className='mr-5 mt-3' />
                        </div>
                        <div>
                            <span className=''>Espacio accesible</span>
                        </div>
                    </div>

                    <div className='c pc100 p0'>
                        <div>
                            <input type="checkbox" name="" id="Huella de carbono reducida" className='mr-5 mt-3' />
                        </div>
                        <div>
                            <span className=''>Huella de carbono reducida</span>
                        </div>
                    </div>
               </div> 
            </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal' style={{"minHeight" : "40px"}}>
              <p>Fuentes de verificación adjuntados:</p>
            </div>
            <div className='ficha-col remains'>
            <div className='c pc100 p0'>
                        <div>
                            <input type="checkbox" name="" id="Encuestas" className='mr-5 mt-3' />
                        </div>
                        <div>
                            <span className=''>Encuestas</span>
                        </div>
                    </div>
            
                    <div className='c pc100 p0'>
                        <div>
                            <input type="checkbox" name="" id="Fotografías" className='mr-5 mt-3' />
                        </div>
                        <div>
                            <span className=''>Fotografías</span>
                        </div>
                    </div>

                    <div className='c pc100 p0'>
                        <div>
                            <input type="checkbox" name="" id="Informes" className='mr-5 mt-3' />
                        </div>
                        <div>
                            <span className=''>Informes</span>
                        </div>
                    </div>

                    <div className='c pc100 p0'>
                        <div>
                            <input type="checkbox" name="" id="Listado asistencia" className='mr-5 mt-3' />
                        </div>
                        <div>
                            <span className=''>Listado asistencia</span>
                        </div>
                    </div>

                    <div className='c pc100 p0'>
                        <div>
                            <input type="checkbox" name="" id="Material gráfico y/o impreso" className='mr-5 mt-3' />
                        </div>
                        <div>
                            <span className=''>Material gráfico y/o impreso</span>
                        </div>
                    </div>

                    <div className='c pc100 p0'>
                        <div>
                            <input type="checkbox" name="" id="Nota de prensa" className='mr-5 mt-3' />
                        </div>
                        <div>
                            <span className=''>Nota de prensa</span>
                        </div>
                    </div>

                    <div className='c pc100 p0'>
                        <div>
                            <input type="checkbox" name="" id="Programa" className='mr-5 mt-3' />
                        </div>
                        <div>
                            <span className=''>Programa</span>
                        </div>
                    </div>

                    <div className='c pc100 p0'>
                        <div>
                            <input type="checkbox" name="" id="Vaciado de prensa" className='mr-5 mt-3' />
                        </div>
                        <div>
                            <span className=''>Vaciado de prensa</span>
                        </div>
                    </div>
               </div> 
        </div>

        <div className='ficha-fila-standard'>
            <div className='ficha-colPrincipal' style={{"minHeight" : "40px"}}>
              <p>Descripción de la actividad realizada:</p>
            </div>
            <div className='ficha-col remains' style={{"minHeight" : "300px", "white-space" : "pre-wrap"}}>
             {recupero.descripción}
            </div>
        </div>

        </div>
        </>

  )
}

export default FichaImpresión