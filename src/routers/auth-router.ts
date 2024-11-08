import { Request, Response, Router } from "express";
import { AuthController } from "../controller/auth.controller";
const authController = new AuthController()
const AuthRouter = Router();

AuthRouter.route('/auth').post((req: Request, res: Response) => authController.authentication(req, res));

export default AuthRouter;