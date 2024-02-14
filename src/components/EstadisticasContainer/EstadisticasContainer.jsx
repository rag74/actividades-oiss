import React, { useState , useEffect } from "react";
import './EstadisticasContainer'
import {useUserAuth} from '../../context/UserAuthContext';
import { collection, query, getDoc, getDocs, where, doc } from "firebase/firestore";
import { useParams , useNavigate} from "react-router-dom";
import db from '../../firebase';
import Estadisticas from "../Estadisticas/Estadisticas";
import SkeletonFicha from "../SkeletonFicha/SkeletonFicha";
import EstadisticasComp from "../EstadisticasComp/EstadisticasComp";



function EstadisticasContainer ({user,userNIVEL}) {
  console.log("userNIVEL")
  console.log(userNIVEL)

  const {codigosPlan, reload, generarStats, generarStatsComp, numeroALetras, OISSCentro} = useUserAuth()
  const {REG, STATS} = useParams()
  const navigate = useNavigate()
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true)
  const nivelUsuarioS = JSON.parse(localStorage.getItem('nivelUsuario'));
  console.log(nivelUsuarioS)
  const [autorizado, setAutorizado] = useState(false)


  console.log(reload)
  console.log(codigosPlan)

  useEffect(() => {
    async function getFichas() {
            
        let arr = [] 
        var eq = "=="

              const q = query(collection(db, "repositorioFichas"), where("tipoFicha", "==", "publicada"))

              let querySnapshot = await getDocs(q);


              //FILTRADO POR REGION (SI ES "OISS", se envia todo)
              querySnapshot.forEach(item => {
                  if (REG === "OISS"){
                    arr.push(item.data())
                  } else {
                    if (item.data().delegación == REG)
                    arr.push(item.data())
                  }
              })

            
              
              console.log("bajada firebase:")
              console.log(querySnapshot)
              console.log("resultado del array:")
              /*hacer el sort por fecha final*/ 
              arr.sort((a,b) => (b.fechafinal > a.fechafinal) ? 1 : -1);
              /*luego hacer el sort por codigo*/ 
              arr.sort((a,b) => (b.CodContable < a.CodContable) ? 1 : -1);
              console.log(arr);
              
              setFichas(arr);
              //setLoading(false)

              if (nivelUsuarioS.region === REG || nivelUsuarioS.administrador === true) 
                    {setAutorizado(true)} else {setAutorizado(false)}
              
            setLoading(false)
            
        }
        getFichas()

  }, [reload])
  

  const goBack = () => {
    navigate(-1);}

  return (
   <>
    {loading ? <SkeletonFicha/> 
              :
                !autorizado ? 
                <div className="contenedor noAutorizado">
                  <h3>USUARIO NO AUTORIZADO</h3>
                  <i class="fa-solid fa-circle-left" onClick={goBack}></i>
                </div>
                :

               STATS == "stats" ?
              
                <Estadisticas nivelUsuarioS = {nivelUsuarioS} user = {user} REG = {REG} fichas = {fichas} loading = {loading} codigosPlan = {codigosPlan} generarStats = {generarStats} numeroALetras = {numeroALetras} OISSCentro = {OISSCentro}/>

                :

                STATS == "statscomp" &&

                <EstadisticasComp nivelUsuarioS = {nivelUsuarioS} user = {user} REG = {REG} fichas = {fichas} loading = {loading} codigosPlan = {codigosPlan} generarStats = {generarStats} generarStatsComp = {generarStatsComp} numeroALetras = {numeroALetras} OISSCentro = {OISSCentro}/>
              
              
          }
   </>
  )
}


export default EstadisticasContainer