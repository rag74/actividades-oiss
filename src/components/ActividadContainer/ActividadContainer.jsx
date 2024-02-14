import React, { useState , useEffect } from "react";
import './ActividadContainer.css';
import {useUserAuth} from '../../context/UserAuthContext';
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { useParams , useNavigate} from "react-router-dom";
import Actividad from "../Actividad/Actividad";
import db from '../../firebase';
import SkeletonFicha from "../SkeletonFicha/SkeletonFicha";


function ActividadContainer({user,userNIVEL}) {

  const {admin} = useUserAuth();
  const {REG, ID} = useParams()
  const navigate = useNavigate()
  const [recupero, setRecupero] = useState()
  const [loading, setLoading] = useState(true)

    const nivelUsuarioS = JSON.parse(localStorage.getItem('nivelUsuario'));

    console.log("ActividadContainer")
    console.log(user)
    console.log(user.uid)
    console.log(userNIVEL)
    console.log(REG)
    console.log(ID)

    const [autorizado, setAutorizado] = useState(false)

    useEffect(() => {
       async function getDocumento(){
        if(ID!=null){
          const docRef = doc(db, "repositorioFichas", ID);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            console.log("EXISTE!")
            console.log(docSnap.data())
            setRecupero(docSnap.data())
          }
          setLoading(false)
        }
        if (nivelUsuarioS.region === REG || nivelUsuarioS.administrador === true) 
        {setAutorizado(true)} else {setAutorizado(false)}
        setLoading(false)
      
      }
      getDocumento()

      
          
    }, [])
    
    const goBack = () => {
      navigate(-1);}


    return (
      <>
      {loading ? <SkeletonFicha/> 
              :
                autorizado ? 
                <div className="contenedor">
                  <Actividad ID = {ID} nivelUsuarioS = {nivelUsuarioS} user = {user} REG = {REG} recupero = {recupero} loading ={loading}/>
                </div>
                :
                <div className="contenedor noAutorizado">
                  <h3>USUARIO NO AUTORIZADO</h3>
                  <i class="fa-solid fa-circle-left" onClick={goBack}></i>
                </div>
        }
  
      </>
    
    );
  }

  export default ActividadContainer;