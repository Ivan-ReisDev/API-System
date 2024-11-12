import { Request, Response } from "express";
import { AuthSingUpUseCase } from "./auth-singup-usecase";

export class AuthSingUpController {
    constructor(private authSingUpUseCase: AuthSingUpUseCase) {}

    public async handle(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body
            if(body) {
                const result = await this.authSingUpUseCase.execute(body); 
                
                if (typeof(result)  != "string") {
                    res.status(200).json(result);
                } else {
                    res.status(401).json({ error: result });
                }
            }
        } catch (error) {
            console.error("Erro ao efetuar login:", error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
}
