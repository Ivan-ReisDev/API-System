import { User } from "../../entities/User"; // ou ajuste o caminho conforme necessário
import { prismaCliente } from "../database/prisma";
import { IUserRepository } from "./IUser-repository";

export class MongodbUsersRepositoryes implements IUserRepository {

    async findByNickname(nickname: string): Promise<User | boolean> {
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
            tokenActive: user.tokenActive === null ? undefined : user.tokenActive,
            code: user.code === null ? undefined : user.code,
            tokenIsNotValide: Array.isArray(user.tokenIsNotValide) ? user.tokenIsNotValide : [], 
        } as User;
    }
    

    async save(data: User): Promise<boolean> {
       const newUser = await prismaCliente.user.create({ data });
       
       if(newUser){
        return true;
       }
       return false;
    }
}
