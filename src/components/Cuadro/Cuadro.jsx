import React, { useState } from 'react'
import {useUserAuth} from '../../context/UserAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Cuadro.css'
import LimitarPalabras from '../LimitarPalabras/LimitarPalabras';

function Cuadro({nivelUsuarioS,user,REG,YEAR,fichas,loading,codigosPlan, enCurso,aniosUnicos}) {


  console.log("Datos Cuadro: ")
  console.log(fichas)

  const {timestampToDate, OISSCentro} = useUserAuth()
  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1);}


  const fichasFinales = codigosPlan.map((cod) => {
    
        const fichasElegidas = fichas.filter((ficha) => ficha.CodPlanEstratégico === cod.cod);

        if (fichasElegidas.length > 0) {

            const publicoUnido = (publico)=> {
              if (publico !=""){
                const string = publico.join(", ");
                return string
                }
            }

            const OEyRes = (codigo)=> {
                const OE = codigo.charAt(0)
                const Res = codigo.slice(0, 3);
                return (
                <>
                 <p className='mt-5'>(OE{OE} - R{Res})</p>
                </>
                )
            }

            return (
            <div className="cuadro">

                <h4 className=" mt-10 mb-10">{cod.cod} {cod.desc}</h4>
                    <div className="c-headRow c-bt c-bl c-br">
                            <span className='c-codigo'>Código / Orientación</span>
                            <span className='c-tipo'>Tipo de actividad</span>
                            <span className='c-titulo'>Título de la actividad</span>
                            <span className='c-descripcion'>Descripción de la actividad</span>
                            <span className='c-publico'>Público objetivo</span>
                            <span className='c-formato'>Formato</span>
                            <span className='c-organizado'>Organizado</span>
                            <span className='c-personas'>N.º de pers.</span>
                            <span className='c-lugar'>Lugar</span>
                            <span className='c-fecha'>Fecha</span> 
                    </div>
                    
                        {fichasElegidas?.map((ficha) => (
                            <>
                            <div key={ficha.creado} className={`c-fileRow c-bl c-br ${ficha.tipoFicha === "encurso" && "yellow"}`} >
                            {/*</div><div key={ficha.id} className="c-fileRow c-bl c-br">*/}
                                <span className='c-codigo'>{ficha.CodContable}<p>{OEyRes(ficha.CodPlanEstratégico)}<Link className="badjeRow c-green" to={`/ficha/${REG}/${ficha.id}-${ficha.creado}`} >ver</Link>{ (nivelUsuarioS.administrador || nivelUsuarioS.nivel == 1)  && <Link className="badjeRow c-gray" to={`/control/${REG}/${ficha.id}-${ficha.creado}`} >editar</Link>}</p></span>
                                <span className='c-tipo'><p>{ficha.tipo}</p>{ficha.subtipo && `(${ficha.subtipo})`}</span>
                                <span className='c-titulo'>{ficha.titulo}</span>
                                <span className='c-descripcion'><LimitarPalabras texto={ficha.descripción} cantidadPalabras={50} cantidadRenglones={5}/></span>
                                
                               {/*limitarPalabras(ficha.descripción,ficha.id,60)*/}
                                
                                
                                <span className='c-publico'>{publicoUnido(ficha.destinatarios)}</span>
                                <span className='c-formato'>{ficha.formato}</span>
                                <span className='c-organizado'>{ficha.organizadorDetalle} {ficha.organizadorApoya && `(apoya: ${ficha.organizadorApoya})`}</span>
                                <span className='c-personas'>{ficha.participantes[3] + ficha.ponentes[3] > 0 && ficha.participantes[3] + ficha.ponentes[3]}</span>
                                <span className='c-lugar'>{ficha.localidad}, {ficha.país}</span>
                                <span className='c-fecha'>{timestampToDate(ficha.fechainicio)} {ficha.fechainicio != ficha.fechafinal && `al ${timestampToDate(ficha.fechafinal)}`}</span> 
                            </div>
                            </>
                        ))}
                <div className="mb-10"/>
                    
            </div>
            );}   
    });



  return (
    <>
        <h2>Cuadro de actvidades {OISSCentro[REG]}</h2>
        <div className="panel-header mt-5 fijo-menu">
            <Link onClick={() => navigate(-1)} to="/"><div class="buttonNew ml-0"><i class="fa-solid fa-arrow-left"></i></div></Link>
            {fichas.length > 0 && 
                <Link to={`/stats/${REG}`}><div class="buttonNew ml-0">Estadísticas</div></Link>
            }
            
            {aniosUnicos.map((anio) =>{
                if (anio != YEAR) {
               return <Link key={anio} to={`/cuadro/${anio}/${REG}`}><div class="buttonNew ml-0">{anio}</div></Link>
            }
            })
            }

            
            {enCurso &&
                <div className="labels">
                    <div id="square"/>    
                    <p>actividad en curso</p>
                </div>
            }
        </div>
        <div className='cuadro'>    
        {fichasFinales}
        </div>

    {fichas.length == 0 &&
        <div className="sinFichas">
            <h3>No se han subido fichas de actividades para este Centro o Delegación.</h3>
        </div>        
    }
    
    </>
    )
}

export default Cuadro