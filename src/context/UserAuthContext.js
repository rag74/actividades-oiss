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

const userAuthContext = React.createContext();


export function UserAuthContextProvider(props) {

    const [user, setUser] = useState("");
    const [admin, setAdmin] = useState(false);
    var estadoUser = "";
    console.log(permisos)


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
        })
    }, []);


    useEffect(() => {
        checkAdmin();
    }, [estadoUser]);



    const checkAdmin = () => {
        const localuser = JSON.parse(localStorage.getItem('localuser'));
        //if (localuser.uid === "l7bGGeQjnJNqoaxhQ5cd9cJRAfW2") 
        if (localuser != null) {
            permisos.includes(localuser.uid) ? setAdmin(true) : setAdmin(false)
        } else { setAdmin(false) }
        console.log("CheckAdmin: " + admin)
    }

    ///FUNCIONES DE LOGUEO Y REGISTRO DE USUARIOS FIREBASE

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


    function generateID() {
        let s4 = () => {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
        return 'art-' + s4() + s4();
    }

    const guardarBorrador = async (articleData) => {
        console.log("ArticleData dentro de guardarBorrador", articleData);

        try {
            await setDoc(doc(db, "articles", articleData.articleID), articleData);
            console.log('subido!');
            let element = document.getElementById("miModal");
            element.classList.add("ver");
        } catch (err) {

            console.log(err);
            alert(err);
        }
    }

    const eliminarArticulo = async (articleID) => {

        const docRef = doc(db, "articles", articleID);
        try {
            await updateDoc(docRef, {

                "estado": "eliminado"
            });

            console.log('eliminado!');
            let element = document.getElementById("miModal");
            element.classList.add("ver");
            /*let element2 = document.getElementById("buttonModal");
            element2.onclick = () => { window.location.reload() }
            let element3 = document.getElementById("closeModal");
            element3.onclick = () => { window.location.reload() }*/

        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    const revisarArticulo = async (articleID) => {

        const docRef = doc(db, "articles", articleID);
        try {
            await updateDoc(docRef, {

                "estado": "pendiente"
            });

            console.log('en revisión!');
            /*let element = document.getElementById("miModal");
            element.classList.add("ver");
            let element2 = document.getElementById("buttonModal");
            element2.onclick = () => { history.push("/panel") }
            let element3 = document.getElementById("closeModal");
            element3.onclick = () => { history.push("/panel") };*/

        } catch (err) {
            console.log(err);
            alert(err);
        }
    }


    const publicarArticulo = async (articleID) => {

        const docRef = doc(db, "articles", articleID);
        try {
            await updateDoc(docRef, {

                "estado": "publicado",
                "fecha": new Date()
            });

            console.log('publicado!');
            let element = document.getElementById("miModal");
            element.classList.add("ver");

            /*let element2 = document.getElementById("buttonModal");
            element2.onclick = () => { history.push(0) }
            let element3 = document.getElementById("closeModal");
            element3.onclick = () => { history.push(0) };*/

        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    const setearCarrousel = async (articleID, nextChecked) => {
        //console.log("nextChecked?", nextChecked);
        //console.log("articleID?", articleID);
        const docRef = doc(db, "articles", articleID);

        try {
            await updateDoc(docRef, {

                "carrousel": nextChecked
            });

        } catch (err) {

            console.log(err);
            alert(err);
        }
    }

    const value = useMemo(() => {
        return ({
            // poner const y func a pasar
            user,
            logIn,
            logOut,
            signUp,
            generateID,
            guardarBorrador,
            setearCarrousel,
            eliminarArticulo,
            revisarArticulo,
            publicarArticulo,
            checkAdmin,
            permisos,
            admin,
        })

    }, [user])


    return <userAuthContext.Provider value={value} {...props} />
}



export function useUserAuth() {
    const context = React.useContext(userAuthContext);
    return context;
}

