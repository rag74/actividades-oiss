import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import CVStest from '../components/CVStest/CVStest';
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Login/Login';
import Entrada from '../components/Entrada/Entrada';
import PanelUserContainer from '../components/PanelUserContainer/PanelUserContainer'
import ActividadContainer from '../components/ActividadContainer/ActividadContainer'
import SkeletonFicha from '../components/SkeletonFicha/SkeletonFicha';
import ListadoActividadContainer from '../components/ListadoActividadContainer/ListadoActividadContainer';
import FichaImpresiónContainer from '../components/FichaImpresiónContainer/FichaImpresiónContainer';
import FichaImpresión from '../components/FichaImpresión/FichaImpresión';
import { useUserAuth } from "../context/UserAuthContext"

import { ProtectedRoute } from "../components/ProtectedRoute";
import Codificacion from '../components/Codificacion/Codificacion';


function Router() {

    const { user, userNIVEL } = useUserAuth();
    //const localuser = JSON.parse(localStorage.getItem('localuser'));
    //const user = localuser
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path='/' element={<Entrada />} />

                <Route element={<ProtectedRoute />}>
                    <Route path='/panel' element={<PanelUserContainer user={user} userNIVEL={userNIVEL}/>} />
                    <Route path='/nocod/:REG' element={<ActividadContainer user={user} userNIVEL={userNIVEL}/>} />
                    <Route path='/nuevaficha/:REG' element={<ActividadContainer user={user} userNIVEL={userNIVEL}/>} />
                    <Route path='/control/:REG/:ID' element={<ActividadContainer user={user} userNIVEL={userNIVEL}/>} />
                    <Route path='/activ/:REG' element={<ListadoActividadContainer user={user} userNIVEL={userNIVEL}/>} />
                </Route>

                <Route path='/login' element={<Login />} />

                <Route path='/ficha/:REG/:ID' element={<FichaImpresiónContainer user={user} userNIVEL={userNIVEL}/>} />

                <Route path='/testing' element={<CVStest/>} />

            </Routes>
        </BrowserRouter>

    )
}

export default Router
