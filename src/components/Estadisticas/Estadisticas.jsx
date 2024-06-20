import { useEffect, useState } from "react"
import React from 'react'
import './Estadisticas.css'
import SkeletonFicha from "../SkeletonFicha/SkeletonFicha";
import { Link, useNavigate } from 'react-router-dom';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import TortaReg from "../Charts/TortaReg"
import BarraTipoActReg from "../Charts/BarraTipoActReg"
import TortaSubTipoReg from "../Charts/TortaSubTipoReg"
import BarraCompResultReg from "../Charts/BarraCompResultReg"
import BarraActivObj from "../Charts/BarraActivObj"
import BarraColumnaFormato from "../Charts/BarraColumnaFormato"
import ActividadesReg from "../Charts/ActividadesReg"
import TortaFormReg from "../Charts/TortaFormReg "
import BarraFormatoPresVirtual from "../Charts/BarraFormatoPresVirtual"


function Estadisticas({nivelUsuarioS ,user ,REG, fichas, loading, codigosPlan, generarStats, numeroALetras,OISSCentro}) {

    const [load, setLoad] = useState(true)
    const [stats, setStats] = useState()
    const navigate = useNavigate()

useEffect(() => {
          const estadisticas = generarStats(fichas)
          setStats(estadisticas)
          setLoad(false)
        }, [])



  return (
    <>
    {load ?
    
    <SkeletonFicha/>
    :
    <div className="contentStats">
          <h2 className="">{REG != "OISS" ? <>Estadísiticas del {OISSCentro[REG]}</> : <>O.I.S.S - Estadísticas generales</>}</h2>
          <div className="panel-header fijo-menu mt-5">
            <Link onClick={() => navigate(-1)} to="/"><div class="buttonNew ml-0"><i class="fa-solid fa-arrow-left"></i></div></Link>
          </div>  
        
    {stats.totalActividades > 0 && 
    <> 
        <div className="separadorChart"/>

        <div className="contResp">
        <div>
            <ResponsiveContainer width={400} height={300}>
              <TortaSubTipoReg stats = {stats.totalAsistentes} title = {"Asistentes - participación por género"} />
            </ResponsiveContainer>
          </div>
          <div>
            <ResponsiveContainer width={400} height={300}>
              <TortaReg stats = {stats.totalPonentes} title = {"Ponentes - participación por género"} /> 
            </ResponsiveContainer>    
            </div>
        </div>


        <div className="contResp">
            <ResponsiveContainer width={600} height={400}>
              <BarraTipoActReg stats = {stats.tipoysubtipos} />
            </ResponsiveContainer>
        </div>


        <div className="contResp">
          {stats.tipoysubtipos.Asesoramiento.Total > 0 &&
            <ResponsiveContainer width={300} height={200}>
              <TortaSubTipoReg stats = {stats.tipoysubtipos.Asesoramiento} title = {"Asesoramiento - Subtipos"} />
            </ResponsiveContainer>
            }
          {stats.tipoysubtipos.Comunicación.Total > 0 &&
            <ResponsiveContainer width={300} height={200}>
              <TortaSubTipoReg stats = {stats.tipoysubtipos.Comunicación} title = {"Comunicación - Subtipos"} />
            </ResponsiveContainer>
          }
          {stats.tipoysubtipos.Evento.Total > 0 &&
            <ResponsiveContainer width={300} height={200}>
              <TortaSubTipoReg stats = {stats.tipoysubtipos.Evento} title = {"Evento - Subtipos"} />
            </ResponsiveContainer>
          }
          {stats.tipoysubtipos.Formación.Total > 0 &&
            <ResponsiveContainer width={300} height={200}>
              <TortaSubTipoReg stats = {stats.tipoysubtipos.Formación} title = {"Formación - Subtipos"} />
            </ResponsiveContainer>
          }
          {stats.tipoysubtipos.Producto.Total > 0 &&
            <ResponsiveContainer width={300} height={200}>
              <TortaSubTipoReg stats = {stats.tipoysubtipos.Producto} title = {"Producto - Subtipos"} />
            </ResponsiveContainer>
          }
        </div>


        <div className="separadorChart"/>

        <div className="contResp">
            <ResponsiveContainer width={"90%"} height={400}>
              <BarraActivObj stats = {stats.resultadosPorObjetivo} title = {"Actividades por Orientación Estrategica"} />
            </ResponsiveContainer> 
            <ResponsiveContainer width={"90%"} height={400}>
              <BarraCompResultReg stats = {stats.resultadosPorObjetivo} title = {"Orientación Estrategica / Resultados"} />
            </ResponsiveContainer>
        </div>


        <div className="separadorChart"/>

        <div className="contResp">
            
            <ResponsiveContainer width={400} height={300}>
              <TortaSubTipoReg stats = {stats.formatos} title = {"Formatos de actividades (porcentajes)"} />
            </ResponsiveContainer>

            <ResponsiveContainer width={400} height={300}>
              <BarraColumnaFormato stats = {stats.formatos} title = {"Formatos de actividades (cantidad)"} />
            </ResponsiveContainer>

        </div>

        <div className="separadorChart"/>
        <div className="contResp">
            <ResponsiveContainer width={400} height={300}>
              <TortaFormReg stats = {stats.formatoParticipantes} title = {"Formato por asistentes (porcentajes)"} />
            </ResponsiveContainer>

            <ResponsiveContainer width={400} height={300}>
              <BarraColumnaFormato stats = {stats.formatoParticipantes} title = {"Formato por asistentes (cantidad)"} />
            </ResponsiveContainer>
        </div>

        <div className="separadorChart"/>
        <div className="contResp">
          <ResponsiveContainer width={"100%"} height={500}>
              <BarraFormatoPresVirtual stats = {stats.formatoParticipantes} title = {"Formato Presencial / Virtual (completa o de apoyo) por asistentes"} />
            </ResponsiveContainer>
        </div>

        <div className="separadorChart"/>

        <div className="contResp">
            <ResponsiveContainer width={"80%"} height={500}>
              <TortaSubTipoReg stats = {stats.enfoques} title = {"Enfoques transversales"} />
            </ResponsiveContainer>
        </div>
        
        <div className="separadorChart"/>
        <div className="separadorChart"/>

    {/*
        //ACTIVIDADES//
        <div className="contResp">
            <ResponsiveContainer width={"100%"} height={400}>
              <ActividadesReg fichas = {fichas} />
            </ResponsiveContainer>
        </div>
    
        Estadisticas
        {stats.totalActividades}
        {stats.totalAsistentes.total}
        {stats.resultadosPorObjetivo[2].R3}
        {stats.tresActividadesConMasAsistentes[0].nombre}
        {stats.tipoysubtipos.Comunicación["Newsletter"] && <h1>{stats.tipoysubtipos.Comunicación["Newsletter"]}</h1>}
        {stats.enfoques["Total"] && <h1>Hay {stats.enfoques["Total"] } actividades que tienen algun tipo de enfoque</h1>}
        {stats.enfoques["Huella de carbono reducida"] && <h1>Hay {stats.enfoques["Huella de carbono reducida"]} actividades con efoque de "Espacio Accesible"</h1>}
        {stats.enfoques["Huella de carbono reducida"] && <h1>Hay {numeroALetras(stats.enfoques["Total"]).toLowerCase()} actividades con efoqutorta1e de "Espacio Accesible"</h1>}
        {numeroALetras(25).toLowerCase()}
        {stats.tipoysubtipos.Asesoramiento.Total}
    */}  
      </>}  
    </div>
    }

    </>
    )
}

export default Estadisticas
