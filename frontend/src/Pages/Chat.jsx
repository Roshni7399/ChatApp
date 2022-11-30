import React, { useEffect, useState } from "react";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { useSelector, useDispatch } from "react-redux";
import socketIO from "socket.io-client";
import sendLogo from "../assets/send.png";
import "../css/Chat.css";
import Message from "./Message";
import closeIcon from "../assets/closeIcon.png";

const ENDPOINT = "http://localhost:9999/";
let socket;

export default function Chat() {
  const userdata = useSelector(
    (state) => state.auth.data.payload.result.username
  );
  // console.log("userdata",userdata);

  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };
  console.log(messages);

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      // alert("connected");
      setId(socket.id);
    });

    console.log("socket", socket);
    socket.emit("joined", { userdata });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.userdata, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log(data.userdata, data.message);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log(data.userdata, data.message);
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.userdata, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h3>Chit-Chat</h3>
          <a href="/admin/login">
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              userdata={item.id === id ? "" : item.userdata}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
}
