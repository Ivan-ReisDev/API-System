import { Request, Response, Router } from "express";
import { UsersController } from "../controller/users-controller";
import { authGuard } from "../middleware/authGuard";
import { userCreateController } from "../UseCases/users/Create";
import { userDeleteController } from "../UseCases/users/Delete";
const usersController = new UsersController();

const UsersRouter = Router();

UsersRouter.route('/users').post(authGuard(['Admin', 'Diretor', 'User', 'Recursos Humanos']),(req: Request, res: Response) => userCreateController.handle(req, res));
UsersRouter.route('/users').delete(authGuard(['Admin']),(req: Request, res: Response) => userDeleteController.handle(req, res));
UsersRouter.route('/users').get(authGuard(['Admin', 'Diretor', 'User', 'Recursos Humanos']),(req: Request, res: Response) => usersController.listUsers(req, res));

export default UsersRouter;
