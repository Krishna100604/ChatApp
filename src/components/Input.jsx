import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";
import { arrayUnion,Timestamp, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import{v4 as uuid} from "uuid";
import { db, storage } from "../firebase";


function Input(){
    const[text,setText]=useState("");
    const[img,setImg]=useState(null);
     
    const {currentUser}=useContext(AuthContext);
    const {data}=useContext(ChatContext);

    const handleSend=async()=>{
        if(img){
           const storageRef=ref(storage,uuid());
           const uploadTask=uploadBytesResumable(storageRef,img);
           uploadTask.on( 

            (error) => {
              // Handle unsuccessful uploads
            }, 
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                // console.log('File available at', downloadURL);
                await updateDoc(doc(db,"chats",data.chatId),{
                    messages:arrayUnion({
                        id:uuid(),
                        text,
                        senderId:currentUser.uid,
                        date:Timestamp.now(),
                        img:downloadURL,
                    }),
                   });
              });
            }
          );
        }
        else{
           await updateDoc(doc(db,"chats",data.chatId),{
            messages:arrayUnion({
                id:uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now(),
            }),
           });
        }

        await updateDoc(doc(db,"userChats",currentUser.uid),{
            [data.chatId+".lastMessage"]:{
                text,
            },
            [data.chatId+".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db,"userChats",data.user.uid),{
            [data.chatId+".lastMessage"]:{
                text,
            },
            [data.chatId+".date"]: serverTimestamp(),
        });
        setText("");
        setImg(null);

    };

    return(
        <div className="input">
            <input type="text" placeholder="Type something..." onChange={(event)=>setText(event.target.value)}
                value={text}
            />
            <div className="send">
                <img src={Attach} alt=""/>
                <input type="file" style={{display:"none"}} id="file" onChange={(event)=>setImg(event.target.files[0])}/>
                <label htmlFor="file">
                    <img src={Img} alt=""/>

                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}
export default Input;