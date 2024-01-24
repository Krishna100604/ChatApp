import React, { useContext, useState } from "react";
import{collection,query,where,setDoc,doc,updateDoc,getDoc, serverTimestamp,getDocs} from "firebase/firestore";
import {db} from "../firebase"
// import Random from "../img/random.jpeg";
import { AuthContext } from "../Context/AuthContext";
// import { create } from "react-test-renderer";

function Search(){

    const[userName,setUserName]=useState("");
    const[user,setUser]=useState(null);
    const[err,setErr]=useState(false);

    const {currentUser}=useContext(AuthContext);

const handleSearch=async ()=>{
  const q=query(collection(db,"users"),
 where("Name","==",userName)
 );
 try{
 const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }
    catch(err){
        setErr(true);
    }


}
    const handleKey=(event)=>{
        event.code==="Enter"&& handleSearch();
    };

    const handleSelect= async()=>{
         //check whether the group(chats in firestore) exists ,if not create
         const combinedId=currentUser.uid > user.uid
         ?currentUser.uid+user.uid
         :user.uid+currentUser.uid;

         try{
            const res=await getDoc(doc(db,"chats",combinedId));

            if(!res.exists()){
                // create a chat in chats collection
              await setDoc(doc(db,"chats",combinedId),{messages:[]});
              
              await updateDoc(doc(db,"userChats",currentUser.uid),{
                [combinedId+".userInfo"]:{
                 uid:user.uid,
                  Name:user.Name,
                  photoURL:user.photoURL,
                },
                [combinedId+".date"]:serverTimestamp(),
              });
              // create user chats
              await updateDoc(doc(db,"userChats",user.uid),{
                [combinedId+".userInfo"]:{
                 uid:currentUser.uid,
                  Name:currentUser.Name,
                  photoURL:currentUser.photoURL,
                },
                [combinedId+".date"]:serverTimestamp(),
              });
            }
         }
         catch(err){}
          setUser(null);
          setUserName("")
    };


    return(
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="find a user" onKeyDown={handleKey}                
                onChange={(event)=>setUserName(event.target.value)}
                    value={userName}
                />
            </div> 
            {err && <span>User not found !</span>}   
          {user && (
               <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} alt=""/>
                <div className="userChatInfo">
                    <span>{user.Name}</span>
                </div>
            </div>
            )}
        </div>
    );
};
export default Search;