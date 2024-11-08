import { Request, Response } from "express";
import { IRequestUser } from "../../types/user-interfaces";
import { IError } from "../../types/error.interface";
import { UsersGetCore } from "../UseCases/users/Get/users-get-core";

export class UsersController {

    public async listUsers(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            
            const usersGetCore = new UsersGetCore(page, limit, req.user as IRequestUser);
            const result = await usersGetCore.Execute();

            if ("error" in result) {
                res.status(result.status).json({ error: result.error });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
}
