import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserAuth } from "../context/UserAuthContext"
import { useEffect } from 'react';



export const ProtectedRoute = ({ user/*, children*/ }) => {

  console.log(user)

  return (
    user ? <Outlet /> : <Navigate to='/login' />
  );
}


/*const localuser = JSON.parse(localStorage.getItem('localuser'));
console.log(localuser);

const { user, admin } = useUserAuth();
const navigate = useNavigate();


useEffect(() => {
if (!user) {
  navigate('/login');
}

},)


return children;*/
