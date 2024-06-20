import React from 'react';
import './App.css';
import Router from "./pages/Router";
import { UserAuthContextProvider } from "./context/UserAuthContext"

function App() {

  if (process.env.NODE_ENV === "production")
    console.log = function no_console() {};

  return (
    <>
      <UserAuthContextProvider>
        <Router>
          <App></App>
        </Router>
      </UserAuthContextProvider>

    </>
  );
}

export default App;
