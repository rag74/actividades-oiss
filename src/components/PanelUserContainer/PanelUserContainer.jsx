import React, { useEffect, useState } from "react";
import './PanelUserContainer.css';
import {useUserAuth} from '../../context/UserAuthContext';
import db from "../../firebase";
import { collection, query, getDoc, getDocs, where, doc } from 'firebase/firestore';
import PanelUser from '../PanelUser/PanelUser'
import MyLoader from "../Loaders/MyLoader";


function PanelUserContainer ({user,userNIVEL}) {

  const [userLevels, setUserLevels] = useState([])
  const [loading, setLoading] = useState(true)
    console.log("UserHubContainer usuario y niveles")
    console.log(user.metadata)
    console.log(user.uid)
    console.log(userLevels)

    
    useEffect(() => {
      if (userNIVEL){
        setUserLevels(userNIVEL)
        setLoading(false)
      } else {
      async function getLevels() {
        const docRef = doc(db, "nivelesUsuarios", user.uid);
        const docSnap = await getDoc(docRef);
        console.log("console log DOCSNAP.DATA")
        console.log(docSnap.data())
        setUserLevels(docSnap.data())
        setLoading(false)
      }
      getLevels()
    }
    }, [user]);


    console.log("niveles usuario")
    console.log(userLevels.nivel)
    console.log("usuario COMPLETO")
    console.log(userLevels)

    return (
      <div className='contenedor'>
      { loading ? 
          
          <div className="panel">
            <div className="viñeta">
              <MyLoader />
            </div>  
            <div className="viñeta">
              <MyLoader />
            </div>
            <div className="viñeta">
              <MyLoader />
            </div>
          </div>
        
        :

          <div className="panel">
              <PanelUser userLevels={userLevels} user={user}/>  
          </div>
      }
      </div>
    );
  }

  export default PanelUserContainer;

