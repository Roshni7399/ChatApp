import axios from "axios";
import { getInfo } from "../Services/auth.header";

const TOKEN = getInfo();

const API_URL = "http://localhost:9999/";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: TOKEN,
  },
};

export const userSignup = async (username, email, password) => {
    // console.log(username)
    // console.log(email)
    // console.log(password)
  return await axios.post(
    API_URL + "chatuser/signup",
    {
      username,
      email,
      password
    },
    axiosConfig
  );

};

// Login
export const userLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(
      API_URL + "chatuser/login",
      {
        email,
        password,
      },
      axiosConfig
    );
    if (response.data.status == true) {
      localStorage.setItem("users", JSON.stringify(response.data));

      return response;
    } else {
      return response;
    }
  } catch (e) {
    return null;
  }
  // console.log(email)
  // console.log(password)
};
