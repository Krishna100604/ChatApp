import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { AuthContext } from "./Context/AuthContext";
import { AuthContextProvider } from "./Context/AuthContext";
import { ChatContextProvider } from "./Context/ChatContext";

// ReactDOM.render(
//   <React.StrictMode>
//     <App/>
//   </React.StrictMode>,document.getElementById("root")
// );
ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
      <ChatContextProvider>
         <React.StrictMode>
           <App />
         </React.StrictMode>
      </ChatContextProvider>
  </AuthContextProvider>,
);

// ReactDOM.render(<App/>,document.getElementById("root"));