import React from 'react';
import {
    BrowserRouter,
    Route,
    Routes,
} from "react-router-dom";

import Hola from "../components/Hola";
import Navbar from '../components/Navbar/Navbar';
import Login from '../components/Login/Login';
import Entrada from '../components/Entrada/Entrada';
import { useUserAuth } from "../context/UserAuthContext"

import { ProtectedRoute } from "../components/ProtectedRoute";
import Codificacion from '../components/Codificacion/Codificacion';


function Router() {

    const { user } = useUserAuth();

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>
                <Route path='/' element={<Entrada />} />

                <Route element={<ProtectedRoute user={user} />}>
                    <Route path='/panel' element={<Hola />} />
                    
                </Route>

                <Route path='/login' element={<Login />} />

                <Route path='/testing' element={<Codificacion />} />

            </Routes>
        </BrowserRouter>

    )
}

export default Router
