import React, { useState , useEffect } from "react";
import './ListadoActividadContainer.css';
import {useUserAuth} from '../../context/UserAuthContext';
import { collection, query, getDoc, getDocs, where, doc } from "firebase/firestore";
import { useParams , useNavigate} from "react-router-dom";
import db from '../../firebase';
import ListadoActividades from "../ListadoActividades/ListadoActividades";
import SkeletonFicha from "../SkeletonFicha/SkeletonFicha";


function ListadoActividadContainer({user,userNIVEL}) {
  console.log("userNIVEL")
  console.log(userNIVEL)

  const {codigosPlan} = useUserAuth()
  const {REG} = useParams()
  const navigate = useNavigate()
  const [fichas, setFichas] = useState([]);
  const [loading, setLoading] = useState(true)
  const nivelUsuarioS = JSON.parse(localStorage.getItem('nivelUsuario'));
  console.log(nivelUsuarioS)
  const [autorizado, setAutorizado] = useState(false)

  console.log(codigosPlan)

  useEffect(() => {
    async function getFichas() {
            
        let arr = []
      
      
              const q = query(collection(db, "repositorioFichas")/*, where("editor", "==", (localuser.uid))*/)
              let querySnapshot = await getDocs(q);
              
              querySnapshot.forEach(item => {
              arr.push(item.data())
              })
              
              console.log("bajada firebase:")
              console.log(querySnapshot)
              console.log("resultado del array:")
              arr.sort((a,b) => (b.fechafinal > a.fechafinal) ? 1 : -1);
              console.log(arr);
              
              setFichas(arr);
              //setLoading(false)

              if (nivelUsuarioS.region === REG || nivelUsuarioS.administrador === true) 
                    {setAutorizado(true)} else {setAutorizado(false)}
              
            setLoading(false)
            
        }
        getFichas()

  }, [])
  

  const goBack = () => {
    navigate(-1);}

  return (
   <>
    {loading ? <SkeletonFicha/> 
              :
                autorizado ? 
                <div className="contenedor listadoActividad">
                  <ListadoActividades nivelUsuarioS = {nivelUsuarioS} user = {user} REG = {REG} fichas = {fichas} loading = {loading} codigosPlan = {codigosPlan}/>
                </div>
                :
                <div className="contenedor noAutorizado">
                  <h3>USUARIO NO AUTORIZADO</h3>
                  <i class="fa-solid fa-circle-left" onClick={goBack}></i>
                </div>
        }
   </>
  )
}

export default ListadoActividadContainer