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
            const deleteUser = await this.usersDeleteUserUseCase.Execute(data);
            if (typeof deleteUser === "string") {
                res.status(400).send({ error: "Ocorreu erro" });  
                return; 
            }

            res.status(204).send();  
            return; 
        } catch (error: any) {
            res.status(400).json({ error: error.message || "Erro ao criar o usuário." }); 
            return; 
        }
    }
}
