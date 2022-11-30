import User from "../model/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


// Signup
export const signup = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  const data = await newUser.save();
  if(data){
    return res.send({ 
      status: true, 
      message: "Registered successfully", 
      code: 200,
      result:data
   })}
};

// Login 
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const result = await User.findOne({ email });
  if (!result) {
    res.send({
      status: false,
      message: "Invalid Credentials-Email is Incorrect !!!",
    });
  }

  const isValid = bcrypt.compareSync(password, result.password);

  if (isValid) {
    let payload = {};
    payload._id = result._id;
    console.log(result);
    jwt.sign(payload, "something", { expiresIn: "24h" }, (err, token) => {
      res.send({ 
        status: true,
        message: "Successfully Login",
        Token: token,
        result:result
      });
    });
  } else {
    res.send({
      status: false,
      message: "Password is incorrect- Please enter correct password",
    });
  }
};
