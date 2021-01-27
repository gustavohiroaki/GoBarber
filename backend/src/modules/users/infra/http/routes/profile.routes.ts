import { Router } from "express";

import ProfileController from "@modules/users/infra/http/controller/ProfileController";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);
profileRouter.get("/", ProfileController.show);
profileRouter.put("/", ProfileController.update);

export default profileRouter;
