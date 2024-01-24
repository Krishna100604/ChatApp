import React, { useContext } from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import "./style.scss";
import Home from "./Pages/Home";
import { Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

function App() {

  const {currentUser}=useContext(AuthContext);
  
  const ProtectedRoute=({children})=>{
    if(!currentUser){
      return <Navigate to="/login"/>;
    }
    return children
  };
  
  return (

  <BrowserRouter>
    <Routes>
      <Route path="/">
      <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        <Route path="login" element={<Login/>}></Route>
        <Route path="register" element={<Register/>}></Route>

      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
