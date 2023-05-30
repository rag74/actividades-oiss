import React, { useState , useEffect } from "react";
import './ActividadContainer.css';
import {useUserAuth} from '../../context/UserAuthContext';
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { useParams , useNavigate} from "react-router-dom";
import Actividad from "../Actividad/Actividad";


function ActividadContainer({user,userNIVEL}) {

  const {admin} = useUserAuth();
  const {REG} = useParams()
  const navigate = useNavigate()

    const nivelUsuarioS = JSON.parse(localStorage.getItem('nivelUsuario'));

    console.log("ActividadContainer")
    console.log(user)
    console.log(user.uid)
    console.log(userNIVEL)
    console.log(REG)

    const [autorizado, setAutorizado] = useState(false)

    useEffect(() => {
      if (nivelUsuarioS.region === REG || nivelUsuarioS.administrador === true) 
          {setAutorizado(true)} else {setAutorizado(false)}
      
    }, [])
    
    const goBack = () => {
      navigate(-1);}


    return (
      <>
    { autorizado ?
      <div className="contenedor">
        <h1>ActividadContainer</h1>
        <Actividad nivelUsuarioS = {nivelUsuarioS} />
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