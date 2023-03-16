import React from 'react';
import './App.css';
import Router from "./pages/Router";
import { UserAuthContextProvider } from "./context/UserAuthContext"

function App() {
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
