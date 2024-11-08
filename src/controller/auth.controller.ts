import { Request, Response } from "express";
import { AuthCore } from "../UseCases/Auth/auth-core";

export class AuthController {
    public async authentication(req: Request, res: Response): Promise<void> {
        try {
            const body = req.body

            const authCore = new AuthCore(body.nickname, body.password); 

            const result = await authCore.Execute(); 

            if ( typeof(result)  != "string") {
                res.status(200).json(result);
            } else {
                res.status(401).json({ error: result });
            }
        } catch (error) {
            console.error("Erro ao efetuar login:", error);
            res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }
}
