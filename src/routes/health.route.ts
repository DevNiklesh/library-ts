import { Router, Request, Response } from "express";
import { messages } from "../constants/messages";
import mongoose from "mongoose";

const router = Router();

router.get(
  "/app-health-check",
  async (req: Request, res: Response) => {
    const isMongoConnected = mongoose.connection.readyState === 1;
    if(isMongoConnected){
      res.status(200).send({
        statusCode: 200,
        message: "Application is connected to database and running healthy"
      });
    }else{
      res.status(503).json({ message: messages.mongoDown })
    }
  }
);

export default router;