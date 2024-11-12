import { User } from "../../entities/User"; // ou ajuste o caminho conforme necessário
import { prismaCliente } from "../database/prisma";
import { IUserRepository } from "./IUser-repository";

export class MongodbUsersRepositoryes implements IUserRepository {

    async findByNickname(nickname: string): Promise<Omit<User, 'password' | 'token' | 'tokenActive'> | boolean> {
        const user = await prismaCliente.user.findUnique({
            where: {
                nickname: nickname,
            },
        });
    
        if (!user) {
            return false;
        }
    
        return {
            ...user,
            password: undefined,          
            token: undefined,
            tokenActive: user.tokenActive === null ? undefined : user.tokenActive,
            code: user.code === null ? undefined : user.code,
            tokenIsNotValide: Array.isArray(user.tokenIsNotValide) ? user.tokenIsNotValide : [],
        };
    }
}