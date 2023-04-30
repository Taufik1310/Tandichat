import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/auth.validation.js";
import { newAccount, checkLogin, insertJWT, removeJWT } from "../model/auth.model.js";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import CONFIG from "../config.js";
import expressResponse from "../utils/expressResponse.js";

export async function login(req: Request, res: Response) {
  const result = loginSchema.safeParse(req.body);

  if (result.success === false) {
    const response = new expressResponse.schemaValidationResponse();
    res.send(response).status(response.code);
    return;
  }

  const response = await (
    await checkLogin(result.data.username, result.data.password)
  ).cata({
    Ok: async (v) => {
      const sessionResult = (await insertJWT(v)).cata({
        Ok: (v) => v,
        Err: () => new expressResponse.badServerResponse(500, "Fail to store jwt"),
      });

      if (sessionResult instanceof expressResponse.badServerResponse) {
        return sessionResult;
      }
      const token = jwt.sign({ username: result.data.username, sessionId: sessionResult }, CONFIG.secret_key);

      return new expressResponse.goodResponse(200, { token: token });
    },
    Err: (e) => new expressResponse.badClientResponse(404, e),
  });

  return res.send(response).status(response.code);
}

export async function logout(req: Request, res: Response) {
  if (typeof req.headers.authorization === "undefined") {
    const response = new expressResponse.headerValidationResponse("Authorization header not provided");
    return res.send(response).status(response.code);
  }
  try {
    const token = jwt.verify(req.headers.authorization, CONFIG.secret_key) as JwtPayload;
    const response = (await removeJWT(token.sessionId)).cata({
      Ok: (v) => new expressResponse.goodResponse(200, {}),
      Err: (e) => new expressResponse.badClientResponse(400, e),
    });

    return res.send(response).status(response.code);
  } catch (error) {
    const response = new expressResponse.badClientResponse(400, "JWT verify failed");
    return res.send(response).status(response.code);
  }
}

export async function register(req: Request, res: Response) {
  const result = registerSchema.safeParse(req.body);

  if (result.success === false) {
    const response = new expressResponse.schemaValidationResponse();
    res.send(response).status(response.code);
    return;
  }

  const response = (await newAccount(result.data.email, result.data.username, result.data.password)).cata({
    Ok: () => new expressResponse.goodResponse(201, {}),
    Err: (err) => new expressResponse.badClientResponse(400, err),
  });

  return res.send(response).status(response.code);
}
