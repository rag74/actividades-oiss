import React, { useState , useEffect } from "react";
import './ListadoActividadContainer.css';
import {useUserAuth} from '../../context/UserAuthContext';
import { collection, query, getDoc, getDocs, where, doc } from "firebase/firestore";
import { useParams , useNavigate} from "react-router-dom";
import db from '../../firebase';
import ListadoActividades from "../ListadoActividades/ListadoActividades";
import SkeletonFicha from "../SkeletonFicha/SkeletonFicha";
import Updating from "../Updating/Updating";


function ListadoActividadContainer({user,userNIVEL}) {
  console.log("userNIVEL")
  console.log(userNIVEL)

  const {codigosPlan, reload} = useUserAuth()
  const {YEAR,REG} = useParams()
  console.log(YEAR,REG)
  const navigate = useNavigate()
  const [fichas, setFichas] = useState([]);

  const [loading, setLoading] = useState(true)
  const [update, setUpdate] = useState(false)
  
  const nivelUsuarioS = JSON.parse(localStorage.getItem('nivelUsuario'));
  console.log(nivelUsuarioS)
  const [autorizado, setAutorizado] = useState(false)
 
  const [enCurso, setEncurso] = useState(false)
  const [aniosUnicos, setAniosUnicos] = useState()

  const setReload1 = ""

  console.log(reload)
  console.log(codigosPlan)

  useEffect(() => {
    async function getFichas() {
        
        //setLoading(true)
            
        let arr = []
        let arrBotones = []
      
              const q = query(collection(db, "repositorioFichas")/*,where("período", "array-contains", +YEAR)*/,where("tipoFicha", "==", "publicada"), where("delegación", "==", REG))

              const r = query(collection(db, "repositorioFichas")/*,where("período", "array-contains", +YEAR)*/,where("tipoFicha", "==", "encurso"), where("delegación", "==", REG))
              /*const q = query(collection(db, "repositorioFichas"), where("tipoFicha", "!=", "publicada")/*,where("delegación", "==", REG))
              ,where("periodos", "array-contains", 2025)
              */
              

              let querySnapshot = await getDocs(q)
                
                querySnapshot.forEach(item => {
                console.log(item.data().período)
                  if (item.data().período.includes(+YEAR)){
                    arr.push(item.data())
                  }
                  arrBotones.push(item.data())
              })

              querySnapshot = await getDocs(r)
              
              querySnapshot.forEach(item => {
                if (item.data().período.includes(+YEAR)){
                  arr.push(item.data())
                }
                arrBotones.push(item.data())
              })


              
              //console.log("bajada firebase:")
              //console.log(querySnapshot)
              console.log("resultado del array:")
              /*hacer el sort por fecha final*/ 
              arr.sort((a,b) => (b.fechafinal > a.fechafinal) ? 1 : -1);
              /*luego hacer el sort por codigo*/ 
              arr.sort((a,b) => (b.CodContable < a.CodContable) ? 1 : -1);

              setFichas(arr)
              console.log(arr);

              const hayEnCurso = arr.some(documento => documento.tipoFicha === "encurso");
              console.log("HAY ENCURSO?")
              console.log(hayEnCurso)
              setEncurso(hayEnCurso)


              // buscar años únicos para botones (2024-2030)
              const allYears = arrBotones.reduce((acc, doc) => {
                return acc.concat(doc.período);
              }, []);
              const filteredYears = allYears.filter(year => year >= 2023 && year <= 2030);
              const uniqueYears = [...new Set(filteredYears)]
              console.log("Años unicos")
              console.log(uniqueYears)
              setAniosUnicos(uniqueYears)
          

              //Autorizado?
              if (nivelUsuarioS.region === REG || nivelUsuarioS.administrador === true) 
                    {setAutorizado(true)} else {setAutorizado(false)}
              
            setUpdate(false)        
            setLoading(false)
            
            
        }
        getFichas()

  }, [reload, YEAR])


  ///EVITAR PRIMERA CARGA USEFFECT YEARS UPDATING
  const [primeraVez, setPrimeraVez] = useState(true);

  useEffect(() => {
    if (!primeraVez) {
      // ... ejecutar código solo después de la primera renderización
      setUpdate(true)
    }
    setPrimeraVez(false);
  }, [YEAR]);
  



  const goBack = () => {
    navigate(-1);}




  return (
   <>
    {loading ? <SkeletonFicha/> 
              :
                autorizado ? 
                <div className="contenedor listadoActividad">
                  <ListadoActividades nivelUsuarioS = {nivelUsuarioS} user = {user} REG = {REG} YEAR = {YEAR} fichas = {fichas} loading = {loading} codigosPlan = {codigosPlan} enCurso = {enCurso} aniosUnicos ={aniosUnicos}/>
                </div>
                :
                <div className="contenedor noAutorizado">
                  <h3>USUARIO NO AUTORIZADO</h3>
                  <i class="fa-solid fa-circle-left" onClick={goBack}></i>
                </div>
        }
      {update && <Updating/>}
   </>
  )
}

export default ListadoActividadContainer

//Filtrado de fichas a bajas
/*, where("editor", "==", (localuser.uid))*/

/*where("fichaTipo", "===", "publicada")*/