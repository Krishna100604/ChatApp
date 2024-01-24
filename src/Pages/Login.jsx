import React from "react";
import { useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase";



function Login(){

    const[err,setErr]=useState(false);
    const navigate=useNavigate();
 
     const handleSubmit = async(event)=>{
         event.preventDefault();
         const email=event.target[0].value;
         const password=event.target[1].value;
             
 
 // const auth = getAuth();
 try{
 await signInWithEmailAndPassword(auth,email,password);
 navigate("/");
 }
  catch(err){
   setErr(true);
  }
 
 };


    return(
        <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">Chat-App</span>
          <span className="title">Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email"/>
                <input type="password" placeholder="password"/>      
                <button>Sign in</button>   
                {err && <span>Something went wrong </span>}
            </form>
            <p>Don't have an Account? <Link to="/register">Register</Link></p>
        </div>
    </div>
    );

}

export default Login;