import { Request, Response } from "express";
import { UsersDeleteUserUseCase } from "./users-delete-usecase";
import { IDeleteUserRequestDTO, UserRequest } from "./users-delete-DTO";

export class UserDeleteController {
    constructor(private usersDeleteUserUseCase: UsersDeleteUserUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const userDeleteId = req.headers['user-delete-id']; 
          if(!userDeleteId){
             res.status(400).send({ error: "Ops! Envie o ID do usuário." });  
             return; 
        }

        const data: IDeleteUserRequestDTO = {
            userDeleteId: userDeleteId as string,
            user: req.user as UserRequest
        }

        try {
            const deleteUser = await this.usersDeleteUserUseCase.execute(data);
            if (typeof deleteUser === "object") {
                res.status(deleteUser.status).send({ error: deleteUser.error });  
                return; 
            }

            res.status(204).send();  
            return; 
        } catch (error: any) {
            console.log(error.message);
            res.status(500).json({ error: "Erro interno no servidor" }); 
            return; 
        }
    }
}
