import jwt from "jsonwebtoken";
import { prismaCliente } from "../repositories/database/prisma";
import { Request, Response, NextFunction } from "express";
import config from "config";

interface CustomRequest extends Request {
    idUser?: string;
    user?: { // Apenas undefined, sem null
        id: string;
        nickname: string;
        patent: string;
        userType: string;
    };
}

const JWTECRET = config.get<string>("JWTSECRET");

export const authGuard = (requiredRoles: string[]) => {
    return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const authHeader = req.headers["authorization"];
            if (!authHeader) {
                res.status(401).json({ errors: ["Acesso negado!"] });
                return;
            }

            const token = authHeader.split(" ")[1];
            if (!token) {
                res.status(401).json({ errors: ["Acesso negado!"] });
                return;
            }

            const verified = jwt.verify(token, JWTECRET) as { id: string };
            req.idUser = verified.id;

            const user = await prismaCliente.user.findUnique({
                where: { id: req.idUser },
                select: {
                    id: true,
                    nickname: true,
                    patent: true,
                    userType: true,
                }
            });

            // Verifique se o usuário existe antes de atribuir a req.user
            if (!user) {
                res.status(404).json({ errors: ["Usuário não encontrado."] });
                return;
            }

            req.user = user; // Agora, sabemos que user não é null

            if (!requiredRoles.includes(req.user.userType)) {
                res.status(403).json({ errors: ["Permissão insuficiente."] });
                return;
            }

            next();
        } catch (err) {
            console.error(err);
            if (err instanceof jwt.JsonWebTokenError) {
                res.status(401).json({ errors: ["Token inválido."] });
            } else {
                res.status(500).json({ errors: ["Erro interno do servidor."] });
            }
            return;
        }
    };
};
