import { prisma } from "../utils/connect.js";
import bcrypt from "bcrypt";
import { Ok, Err, Result } from "pratica";
import { PrismaErrorWrapper } from "../utils/prismaErrorHandling.js";
import { Prisma } from "@prisma/client";

const SALT_ROUND = 10;

export async function newAccount(email: string, username: string, password: string): Promise<Result<boolean, string>> {
  try {
    const hashPassword = await bcrypt.hash(password, SALT_ROUND);

    await prisma.account.create({
      data: {
        email: email,
        password: hashPassword,
        username: username,
      },
    });

    return Ok(true);
  } catch (error) {
    return Err(PrismaErrorWrapper(error));
  }
}

export async function checkLogin(username: string, password: string): Promise<Result<string, string>> {
  try {
    const user = await prisma.account.findUnique({ where: { username: username } });
    if (user === null) {
      return Err("Username not found");
    }

    const isUser = await bcrypt.compare(password, user.password);

    if (!isUser) {
      return Err("Password Does not match");
    }

    return Ok(user.id);
  } catch (error) {
    return Err(PrismaErrorWrapper(error));
  }
}

export async function insertJWT(accountId: string): Promise<Result<string, String>> {
  try {
    const session = await prisma.session.create({ data: { accountId: accountId } });

    return Ok(session.id);
  } catch (error) {
    return Err(PrismaErrorWrapper(error));
  }
}

export async function removeJWT(sessionId: string): Promise<Result<boolean, string>> {
  try {
    await prisma.session.delete({ where: { id: sessionId } });
    return Ok(true);
  } catch (error) {
    return Err(PrismaErrorWrapper(error));
  }
}
