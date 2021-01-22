import { Router } from "express";
import SessionsController from "@modules/users/infra/http/controller/SessionsController";

const sessionsRouter = Router();

sessionsRouter.post("/", SessionsController.create);

export default sessionsRouter;
