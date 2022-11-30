import React from "react";
// import socketIO from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Chat from "./Pages/Chat";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import "./App.css";

// const ENDPOINT = "http://localhost:9999";
// const socket = socketIO(ENDPOINT, {transports: ["websocket"] });

function App() {

  // socket.on("connect",()=>{

  // })


  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/admin/login" element={<Login />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
      </Routes>
    </div>
  );
}

export default App;
