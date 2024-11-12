import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import config from "config";
import { prismaCliente } from "../../repositories/database/prisma";

interface UserInfo {
    id: string;
    nickname: string;
    patent: string;
    classes: string[];
    teans: string[];
    status: string;
    userType: string;
    tag:string;
    token: string;
}

export class AuthCore {
    nickname: string;
    password: string;

    constructor(nickname: string, password: string) {
        this.nickname = nickname.trim();
        this.password = password;
    }

    public async Execute(): Promise<UserInfo | string> {
        try {
            const validationError = await this.validate();
            if (validationError) {
                return validationError;
            }

            const loginResult = await this.login();
            if (typeof loginResult === "string") {
                return loginResult; 
            }

            return loginResult;
        } catch (error) {
            console.error("Erro ao executar a operação:", error);
            return "Erro inesperado ao executar a operação.";
        }
    }

    private async validate(): Promise<string | null> {
        if (!this.nickname || typeof this.nickname !== "string") {
            return "Ops! Por favor informe o nickname.";
        }

        if (!this.password || typeof this.password !== "string") {
            return "Ops! Por favor digite sua senha";
        }

        return null;
    }


    private async login(): Promise<UserInfo | string> {
        try {
            const user = await prismaCliente.user.findUnique({
                where: { nickname: this.nickname },
            });

            if (!user) {
                return "Usuário não encontrado.";
            }

            if (user.status === "CFO") {
                return "Sua conta está suspensa até que termine seu CFO.";
            }

            if (user.status === "Pendente") {
                return "Por favor ative sua conta no sistema.";
            }

            if (user.status === "Desativado") {
                return "Sua conta está desativada.";
            }

            const isMatch = await bcrypt.compare(this.password, user.password);
            const tokenActive = await this.generateToken(user.id) ;
            if (!isMatch) {
                return "Nickname ou senha incorretos.";
            }

            return {
                id: user.id,
                nickname: user.nickname,
                patent: user.patent,
                classes: user.classes,
                teans: user.teans,
                status: user.status,
                userType: user.userType,
                tag: user.tag,
                token: tokenActive
            };
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            return "Erro ao verificar a existência do usuário.";
        }
    }
}
