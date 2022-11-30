import express from "express";
import cors from "cors";
import { mongoconnection } from "./db/db";
import bodyParser from "body-parser";
import userRoute from './routes/userRoute'

const app = express();
mongoconnection();

app.use(cors({ origin: "*" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(bodyParser.json({ limit: "50mb" }));

app.use("/chatuser", userRoute);


export default app;
