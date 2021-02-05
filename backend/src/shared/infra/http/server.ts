import "reflect-metadata";
import "dotenv/config";

import express, { Request, Response, NextFunction } from "express";
import { errors } from "celebrate";
import cors from "cors";
import "express-async-errors";

import "@shared/container";
import "@shared/infra/typeorm";
import uploadConfig from "@config/upload";
import AppError from "@shared/errors/AppError";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(rateLimiter);
app.use(express.json());
app.use("/files", express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

// Precisa ter 4 parametros para tratar erros
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.log(err);

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(3333, () => {
  console.log("Server Running");
});
