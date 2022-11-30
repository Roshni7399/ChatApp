import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { userlogin } from "../Slice/AuthSlice";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import {userLogin} from '../Services/auth.service';
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";


export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin(input);
      // console.log(response.data, "response");

      if (response.data.status == true) {
        dispatch(userlogin(response.data));
        navigate("/chat");
        toast.success(
          "Congrats🎉 You've successfully SignIn🤩 ",
          {
            position: toast.POSITION.TOP_CENTER,
          },
          { autoClose: 1000 }
        );
      } else {
        toast.warning(
          "Unable to Login, Please try again ",
          {
            position: toast.POSITION.TOP_CENTER,
          },
          { autoClose: 1000 }
        );
      }
    } catch (e) {
      console.warn(e);
    }
  };
  // console.log(input);

  return (
    <div>
      <FormContainer>
        <form action="" onSubmit={(e) => handleSubmit(e)} >
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Chit-Chat</h1>
          </div>
            <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}

          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}

          />
          <button type="submit">Log In</button>
          <span>
            Don't have an account ? <Link to="/register">Create One.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
      
    </div>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
