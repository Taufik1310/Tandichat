import express from "express";
import bodyParser from "body-parser";
import { login, register, logout } from "./auth/auth.js";
import * as dotenv from "dotenv";

dotenv.config();
const port = 3030;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/login", login);
app.post("/api/register", register);
app.post("/api/logout", logout);

app.listen(port, () => {
  console.log(`App listening on http://127.0.0.1:${port}`);
});