import React, { useState } from 'react';
import "./Navbar.css" 

import {useUserAuth} from "../../context/UserAuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const {user, logOut} = useUserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogOut = async (e) => {
    setError("");
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log(error)
    }
    console.log(user)
  };

  return (
    <header className='header'>
      <div className='contenedor'>
          <div className='navcontainer'>
            <Link to="/">  
              <img src="/img/logochico.png" alt="Logo OISS" className='logooiss'/>
            </Link> 
            <div className='userlog'>
            {user &&
            <>
                        <div className='usermail'>{user.email}</div>
                        <div className='navbutton' onClick={handleLogOut}>cerrar sesión</div>
            </>
              }
            </div>
          </div>
      </div>
    </header>
  )
}

export default Navbar