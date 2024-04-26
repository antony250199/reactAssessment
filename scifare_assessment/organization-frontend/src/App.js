// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/RegisterFormCard";
import UserList from "./components/UserList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/list" element={<UserList />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
