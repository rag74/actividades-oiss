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
import CompTorta from "../Charts/CompTorta";
import CompBarraOE from "../Charts/CompBarraOE";


function EstadisticasComp({nivelUsuarioS ,user ,REG, fichas, loading, codigosPlan, generarStats, numeroALetras,generarStatsComp, OISSCentro}) {

    const [load, setLoad] = useState(true)
    const [stats, setStats] = useState()
    const [statsComp, setStatsComp] = useState()
    const navigate = useNavigate()

useEffect(() => {

          const estadisticas = generarStats(fichas)
          const estadisticasComp = generarStatsComp(fichas,OISSCentro)
          setStats(estadisticas)
          setStatsComp(estadisticasComp)
          setLoad(false)
        }, [])


  return (
    <>
    {load ?
    
    <SkeletonFicha/>
    :
    <div className="contentStats">
          <h2 className="">O.I.S.S - Estadísticas comparadas</h2>
          <div className="panel-header fijo-menu mt-5">
            <Link onClick={() => navigate(-1)} to="/"><div class="buttonNew ml-0"><i class="fa-solid fa-arrow-left"></i></div></Link>
      </div>  
        
    {statsComp.totalActividades > 0 && 
    <> 

        <div className="contResp">
            <ResponsiveContainer width={"70%"} height={400}>
              <CompTorta stats = {statsComp.arrayTortaParticipantes} title = {"Delegaciones - Participantes"} />
            </ResponsiveContainer>
        </div>

        <div className="contResp">
            <ResponsiveContainer width={"90%"} height={500}>
              <CompBarraOE stats = {statsComp.arrayGenero} cuadroTipo = {"BarChart"} state = {"true"} title = {"Delegaciones - Participantes/Ponentes/Género"} />
            </ResponsiveContainer>
        </div>

        <div className="contResp">
            <ResponsiveContainer width={"70%"} height={400}>
              <CompTorta stats = {statsComp.arrayTortaActividades} title = {"Delegaciones - Actividades"} />
            </ResponsiveContainer>
        </div>

        <div className="contResp">
            <ResponsiveContainer width={"90%"} height={500}>
              <CompBarraOE stats = {statsComp.arrayOE} cuadroTipo = {"BarChart"} state = {false} title = {"Delegaciones - Actividades por Orientación Estratégica"} />
            </ResponsiveContainer>
        </div>


        <div className="contResp">
            <ResponsiveContainer width={"90%"} height={500}>
              <CompBarraOE stats = {statsComp.arrayTipo} cuadroTipo = {"ColumnChart"} state = {false} title = {"Delegaciones - Actividades por tipología"} />
            </ResponsiveContainer>
        </div>

        <div className="contResp">
            <ResponsiveContainer width={"90%"} height={500}>
              <CompBarraOE stats = {statsComp.arrayFormatoAct} cuadroTipo = {"BarChart"} state = {false} title = {"Delegaciones - Actividades por formato"} />
            </ResponsiveContainer>
        </div>

        <div className="contResp">
            <ResponsiveContainer width={"90%"} height={500}>
              <CompBarraOE stats = {statsComp.arrayFormatoPart} cuadroTipo = {"BarChart"} state = {false} title = {"Delegaciones - Formato / Partcipantes"} />
            </ResponsiveContainer>
        </div>

        <div className="contResp">
            <ResponsiveContainer width={"90%"} height={500}>
              <CompBarraOE stats = {statsComp.arrayEnfoque} cuadroTipo = {"ColumnChart"} state = {"true"} title = {"Delegaciones - Enfoques transversales"} />
            </ResponsiveContainer>
        </div>

        <div className="separadorChart"/>
        <div className="separadorChart"/>
      
      </>}  
    </div>
    }

    </>
    )
}

export default EstadisticasComp
