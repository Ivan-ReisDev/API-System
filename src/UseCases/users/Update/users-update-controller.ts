import { Request, Response } from "express";
import { UsersUpdateUserUseCase } from "./users-update-usecase";

export class UserUpdateController {
    constructor(private usersUpdateUserUseCase: UsersUpdateUserUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const { data } = req.body;
        const userReq = req.user
        try {
            const updatedData = { ...data, user: userReq };
            const updateUser = await this.usersUpdateUserUseCase.execute(updatedData);

            if (typeof updateUser === "object") {
                res.status(updateUser.status).send({ error: updateUser.error });  
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
