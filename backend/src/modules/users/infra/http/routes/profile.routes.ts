import { Router } from "express";

import ProfileController from "@modules/users/infra/http/controller/ProfileController";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);
profileRouter.put("/", ProfileController.update);

export default profileRouter;
