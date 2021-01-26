import { Router } from "express";
import ForgotPasswordController from "@modules/users/infra/http/controller/ForgotPasswordController";
import ResetPasswordController from "@modules/users/infra/http/controller/ResetPasswordController";

const passwordRouter = Router();

passwordRouter.post("/forgot", ForgotPasswordController.create);
passwordRouter.post("/reset", ResetPasswordController.create);

export default passwordRouter;
