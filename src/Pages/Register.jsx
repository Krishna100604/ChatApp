// import React from "react";
// import { useState } from "react";
// import Add from "../img/addAvatar.png";
// import {createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
// import {auth,db,storage} from "../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore"; 
// import { useNavigate,Link } from "react-router-dom";




// function Register(){

//    const[err,setErr]=useState(false);
//    const[loading,setLoading]=useState(false);
//    const navigate=useNavigate();

//     const handleSubmit = async(event)=>{
//         setLoading(true);
//         event.preventDefault()
//         const Name=event.target[0].value;
//         const email=event.target[1].value;
//         const password=event.target[2].value;
//         const file=event.target[3].files[0];
// try{

// const res= await createUserWithEmailAndPassword(auth, email, password);

// // const storage = getStorage();
// const date=new Date().getTime();
// const storageRef = ref(storage,`${Name+date}`);

// await uploadBytesResumable(storageRef, file).then(() => {
//   getDownloadURL(storageRef).then(async (downloadURL) => {
//     try {
//       //Update profile
//       await updateProfile(res.user, {
//         Name,
//         photoURL: downloadURL,
//       });
//       //create user on firestore
//       await setDoc(doc(db, "users", res.user.uid), {
//         uid: res.user.uid,
//         Name,
//         email,
//         photoURL: downloadURL,
//       });

//       //create empty user chats on firestore
//       await setDoc(doc(db, "userChats", res.user.uid), {});
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//       setErr(true);
//       setLoading(false);
//     }
//   });
// });
// } catch (err) {
// setErr(true);
// setLoading(false);
// }
// };

//    return(
//     <div className="formContainer">
//         <div className="formWrapper">
//           <span className="logo">Chat-App</span>
//           <span className="title">Register</span>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" placeholder="Name"/>
//                 <input type="email" placeholder="email"/>
//                 <input type="password" placeholder="password"/>
//                 <input style={{display:"none"}} type="file" id="file"/>
//                 <label htmlFor="file">
//                     <img src={Add} alt="image"/>
//                     <span>Add an avatar</span>
//                 </label>
//                 <button>Sign up</button>   
//                 {loading && "uploading and compressing the image please wait..."}
//                 {err && <span>Something went wrong</span>}
//             </form>
//             <p>Already have an Account ? <Link to="/Login">Login</Link></p>
//         </div>
//     </div>
//    );
    
// };

// export default Register;


import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const Name = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${Name + date}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      });

      await uploadTask;

      const downloadURL = await getDownloadURL(storageRef);

      await updateProfile(res.user, {
        displayName: Name,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName: Name,
        email,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch (error) {
      console.error(error);
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Chat-App</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Add} alt="image" />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {loading && (
            <div>
              <span>
                Uploading and compressing the image, please wait...
              </span>
              <progress value={uploadProgress} max="100" />
            </div>
          )}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Already have an Account ? <Link to="/Login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
