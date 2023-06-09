import React, { useState , useEffect } from "react";
import {useUserAuth} from '../context/UserAuthContext';
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";

import { useParams } from "react-router-dom";


function Hola({user,userNIVEL}) {

  const {admin} = useUserAuth();
  const {REG} = useParams()

    const nivelUsuarioS = JSON.parse(localStorage.getItem('nivelUsuario'));

    
    console.log("hola mundo")
    console.log(user)
    console.log(user.uid)
    console.log(userNIVEL)
    console.log(REG)

    const [autorizado, setAutorizado] = useState(false)

    useEffect(() => {
      if (nivelUsuarioS.region === REG || nivelUsuarioS.administrador === true) 
          {setAutorizado(true)} else {setAutorizado(false)}
      
    }, [])
    



    return (
      <>
    { autorizado ?
      <div className="">
        <h1>hola mundo</h1>
      </div>
      :
      <div className="">
        <h2>NO ESTA AUTORIZADO</h2>
      </div>
    }
      </>
    
    );
  }

  export default Hola;