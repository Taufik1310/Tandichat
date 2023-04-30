import { Prisma } from "@prisma/client";

export function PrismaErrorWrapper(e: unknown) {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    return e.message;
  } else {
    console.log(e);
    return "unknown error happened";
  }
}
