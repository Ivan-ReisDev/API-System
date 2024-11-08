import { Request, Response } from "express";
// import { UsersCreateCore } from "../UseCases/users/Create/users-create-usecase";
import { IRequestUser } from "../../types/user-interfaces";
import { UsersDeleteCore } from "../UseCases/users/Delete/users-delete-usecase";
import { IError } from "../../types/error.interface";
import { UsersGetCore } from "../UseCases/users/Get/users-get-core";

export class UsersController {
    // public async registered(req: Request, res: Response): Promise<void> {
    //     try {
    //         const body  = req.body
    //         const userCreateCore = new UsersCreateCore(body.nickname, body.patent, req.user as IRequestUser); 
        
    //         const result = await userCreateCore.Execute(); 

    //         if (result === true) {
    //             res.status(201).json({ message: 'Usuário criado com sucesso.' });
    //         } else {
    //             res.status(400).json({ error: result });
    //         }
    //     } catch (error) {
    //         console.error("Erro ao registrar usuário:", error);
    //         res.status(500).json({ error: 'Erro interno do servidor.' });
    //     }
    // }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const id = req.headers["user-id"] as string;
            const userDeleteCore = new UsersDeleteCore(id, req.user as IRequestUser); 
        
            const result: string | IError = await userDeleteCore.Execute(); 

            if (typeof(result) === "string") {
                res.status(204).json({ message: 'Usuário deletado com sucesso' });
                
            } else {
                res.status(400).json({ error: result.error });
            }
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }

    }

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
