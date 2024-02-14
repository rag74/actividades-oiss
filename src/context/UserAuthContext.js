import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import { FirebaseError } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/index";
import { doc, setDoc, updateDoc, getDoc , collection } from '@firebase/firestore';
import db from '../firebase';
import { permisos } from "../data/permisos";
import { destinatarios , iberoamerica, codigosPlan, OISSCentro, OISSViñetas, codigosPresupuesto} from "../data/webdata";
import {verify} from "../data/verificar"
import { generarFicha } from "../data/generarFicha";
import { prellenar } from "../data/prellenar";
import { arrayToCsv } from "../data/arrayToCsv";
import { generarStats } from "../data/generarStats";
import { numeroALetras } from "../data/numeroALetras";
import { generarStatsComp } from "../data/generarStatsComp";

const userAuthContext = React.createContext();


export function UserAuthContextProvider(props) {

    const [user, setUser] = useState("");
    const [admin, setAdmin] = useState(false);
    const [userNIVEL, setUserNIVEL] = useState("");


    const [reload, setReload] = useState("1")

    var estadoUser = "";
    


    useEffect(() => {
        const localuser = JSON.parse(localStorage.getItem('localuser'));
        if (localuser) {
            setUser(localuser);
            estadoUser = "seted"
        }
    }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            localStorage.setItem('localuser', JSON.stringify(currentUser)); //linea agregada
            estadoUser = "changed"
            console.log("changed")
        })
    }, []);


    useEffect(() => {
        if (user) {
        async function getLevels() {
                const docRef = doc(db, "nivelesUsuarios", user.uid);
                const docSnap = await getDoc(docRef);
                console.log("CONTEXT USER DOCSNAP.DATA")
                console.log(docSnap.data())
                
                localStorage.setItem('nivelUsuario', JSON.stringify(docSnap.data()));
                console.log('nivel usuario CONTEXT')
                let nivelUsuarioS = JSON.parse(localStorage.getItem('nivelUsuario'));
                setUserNIVEL(nivelUsuarioS)
                console.log(nivelUsuarioS)
              } 
              getLevels()
              
        } else {
                 console.log('niveles y usuario vacio')
                 setUserNIVEL("")
                 localStorage.removeItem('nivelUsuario');} 
        
      }, [user])
    


    useEffect(() => {
        checkAdmin();
        console.log("USERNIVEL CONTEXT:")
        console.log(userNIVEL)
    }, [estadoUser,userNIVEL]);



    const checkAdmin = () => {
        let localuser = JSON.parse(localStorage.getItem('localuser'));
        //if (localuser.uid === "l7bGGeQjnJNqoaxhQ5cd9cJRAfW2") 
        if (localuser != null) {
            permisos.includes(localuser.uid) ? setAdmin(true) : setAdmin(false)
        } else { setAdmin(false) }
        console.log("CheckAdmin: " + admin)
    }

    ///FUNCIONES DE LOGUEO Y REGISTRO DE USUARIOS FIREBASE///////

    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signUp(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function logOut() {
        return signOut(auth);
        localStorage.removeItem('localuser');
        estadoUser = "deleted"
    }

    ////////////////////////////////////////////////////////


    const guardarFicha = async (ficha) => {

        try {
            await setDoc(doc(db, "repositorioFichas", ficha.id+'-'+ficha.creado), ficha);
            console.log('subido!');
            console.log("Ficha dentro de guardarFicha", ficha);
        } catch (err) {

            console.log(err);
            alert(err);
        }
    }

    const guardarCodigoContable = async (codigoContable,idFicha) => {

        try {
            const docRef = doc(db, "repositorioFichas", idFicha);
            await updateDoc (docRef, codigoContable);
            //await setDoc(doc(db, "repositorioFichas", idFicha), codigoContable);
            setReload(codigoContable)
            console.log('subido!');
            console.log("Codigo Contable subido", codigoContable);
            return true
        } catch (err) {

            console.log(err);
            return false
        }
    }



    const eliminarFicha = async (estadoFicha,idFicha)=>{

        try {
            const docRef = doc(db, "repositorioFichas", idFicha);
            await updateDoc (docRef, estadoFicha);
            //await setDoc(doc(db, "repositorioFichas", idFicha), codigoContable);
            setReload(estadoFicha)
            console.log('eliminada!');
            console.log("Estado eliminada", estadoFicha);
            return true
        } catch (err) {

            console.log(err);
            return false
        }
    }

    // Function para transformar datos numericos en FECHA HUMANA.
    function timestampToDate(timestamp) {
        const date = new Date(timestamp) 
        // Format the date string in the desired format.
        let day = date.getDate()
        let month = date.getMonth();
        month = (month + 1)
        let year = date.getFullYear();

        if (day < 10) {
            day = '0' + day;
        }
        
        if (month < 10) {
            month = `0${month}`;
        }
        
        let formattedDate = `${day}-${month}-${year}`;
       // 23-07-2022

        return formattedDate
}
 
    // Function to download the generated CSV as a .csv file.
    const download = (data, fileName) => {
        const blob = new Blob([data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', fileName + '.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
       };



    const value = useMemo(() => {
        return ({
            // poner const y func a pasar
            user,
            logIn,
            logOut,
            signUp,
            checkAdmin,
            permisos,
            destinatarios,
            iberoamerica,
            codigosPlan,
            OISSCentro,
            OISSViñetas,
            codigosPresupuesto,
            verify,
            generarFicha,
            generarStats,
            generarStatsComp,
            guardarFicha,
            prellenar,
            arrayToCsv,
            download,
            guardarCodigoContable,
            eliminarFicha,
            timestampToDate,
            numeroALetras,
            admin,
            userNIVEL,
            reload,
        })

    }, [user,userNIVEL,reload])


    return <userAuthContext.Provider value={value} {...props} />
}



export function useUserAuth() {
    const context = React.useContext(userAuthContext);
    return context;
}

