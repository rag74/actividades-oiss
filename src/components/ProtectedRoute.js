import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserAuth , useAuthState } from "../context/UserAuthContext"
import { useEffect } from 'react';



export const ProtectedRoute = ({ /*user, children*/ }) => {

 /* const auth = useUserAuth()
  console.log("AUTH?")
  console.log(auth)*/

  const localuser = JSON.parse(localStorage.getItem('localuser'));
  
  console.log(localuser)

  return (
    localuser ? <Outlet /> : <Navigate to='/login' />
  );
}

/*
export const ProtectedRoute = ({ children }) => {

  const localuser = JSON.parse(localStorage.getItem('localuser'));
  console.log(localuser);


  const history = useHistory();

  if (!localuser) {
    history.push('/login');
  }

  return children;
}
*/