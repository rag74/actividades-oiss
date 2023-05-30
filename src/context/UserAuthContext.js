import React, { createContext, useState, useEffect, useContext, useMemo } from "react";
import { FirebaseError } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/index";
import { doc, setDoc, updateDoc, getDoc } from '@firebase/firestore';
import db from '../firebase';
import { permisos } from "../data/permisos";
import { destinatarios , iberoamerica, codigosPlan} from "../data/webdata";
import {verify} from "../data/verificar"

const userAuthContext = React.createContext();


export function UserAuthContextProvider(props) {

    const [user, setUser] = useState("");
    const [admin, setAdmin] = useState(false);
    const [userNIVEL, setUserNIVEL] = useState("");

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
            verify,
            admin,
            userNIVEL,
        })

    }, [user,userNIVEL])


    return <userAuthContext.Provider value={value} {...props} />
}



export function useUserAuth() {
    const context = React.useContext(userAuthContext);
    return context;
}

