import React, { useContext, useEffect } from "react";
import Message from "./Message";
import { ChatContext } from "../Context/ChatContext";
import { useState } from "react";
import { onSnapshot,doc } from "firebase/firestore";
import { db } from "../firebase";


function Messages(){
    const[messages,setMessages]=useState([]);
    const{data}=useContext(ChatContext);

    useEffect(()=>{
        const unSub=onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
            doc.exists()&& setMessages(doc.data().messages);
        });
        return() =>{
            unSub();
        }
    },[data.chatId]);

    return(
     <div className="messages">
        {messages.map((m)=>(
            <Message messages={m} key={m.id}/>
        ))}
     </div>
    );
};

export default Messages;