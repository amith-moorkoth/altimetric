import React, { useState } from "react";
import {
  BrowserRouter,
  Route,Routes,Navigate
} from "react-router-dom";
import MUILogin from "./MUILogin";
import DashBoard from "./DashBoard";


export default function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };


  return (
    <BrowserRouter>
      <Routes>
      <Route path="*" element={<Navigate to={!isAuthenticated?"/login":"/dashboard"} replace />}/>
        {!isAuthenticated&&<Route path="/login" element={<MUILogin handleLogin={handleLogin}/>}/>}
        {isAuthenticated&&<Route path="/dashboard" element={<DashBoard/>}/>}
      </Routes>
    </BrowserRouter>
  );
}
