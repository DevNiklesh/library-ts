import { Request, Response } from "express";
import { messages } from "../constants/messages";

const unknownPath = (req: Request, res: Response) => {
  res.status(404).send({ error: { message: messages.invalidUrl } });
};

const methodNotAllowed = (req: Request, res: Response) => {
  res.status(405).send({ error: { message: messages.methodNotAllowed } });
};

export { unknownPath, methodNotAllowed };