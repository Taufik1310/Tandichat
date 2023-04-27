import { Request, Response } from "express";
import { loginSchema } from "../validation/auth.validation.js";
import jwt from "jsonwebtoken";
import CONFIG from "../config.js";

export async function login(req: Request, res: Response) {
  const result = loginSchema.safeParse(req.body);

  console.log(req.body);

  if (result.success === false) {
    res.send("404");
    throw new Error("TODO: Result validation ");
  }

  //cek login

  //TODO : Cek login di databse

  //buat jwt -> taruh di db -> send back jwt
  const token = jwt.sign({ username: result.data.username, userId: 1230451287, sessionId: 1 }, CONFIG.secret_key);

  return res.send(token);
}

export function register(req: Request, res: Response) {
  throw new Error("TODO: Register");
}
