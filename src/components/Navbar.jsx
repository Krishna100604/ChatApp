import React, { useContext } from "react";
import {signOut} from "firebase/auth"
import { auth } from "../firebase";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
function Navbar(){
    const Navigate=useNavigate();
    function handleClick(){
        Navigate("/Login");
    }
    const {currentUser}=useContext(AuthContext);
    return(
        <div className="navbar">
         <span className="logo">Chat-App</span>
         <div className="user">
            <img src={currentUser.photoURL} alt=""/>
            <span>{currentUser.Name}</span>
            <button onClick={handleClick}>Logout</button>
         </div>
        </div>
    );
}
export default Navbar;