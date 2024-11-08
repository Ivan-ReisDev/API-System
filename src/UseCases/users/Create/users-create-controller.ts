import { Request, Response } from "express";
import { UsersCreateUserUseCase } from "./users-create-usecase";
import config from "config";

export class UserCreateController {
    constructor(private usersCreateUserUseCase: UsersCreateUserUseCase) {}

    async handle(req: Request, res: Response): Promise<void> {
        const { nickname, patent, classes } = req.body;
        const PASSWORD = config.get<number>("PASSWORD").toString();
        try {
            const newUser = await this.usersCreateUserUseCase.Execute({              
                nickname: nickname,
                password: PASSWORD,
                patent: patent,
                classes: classes ? [classes] : ["Curso Inicial [C.I]"],
                teans: ["System"], 
                status: "Pendente",
                tag: "Vazio",
                warnings: 0,
                medals: "0",
                userType: "User",
            });

            if (typeof newUser === "object") {
                res.status(newUser.status).send({ error: newUser.error });  
                return; 
            }

            res.status(201).send();  
            return; 
        } catch (error: any) {
            res.status(400).json({ error: error.message || "Erro ao criar o usuário." }); 
            return; 
        }
    }
}
