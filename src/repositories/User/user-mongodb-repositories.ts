import { promises } from "dns";
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

    async findById(id:string): Promise<User | boolean> { 
        const user = await prismaCliente.user.findUnique({
            where: {
                id: id,
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
        const userData = {
            ...data,
            password: data.password ?? "dshgf09243bf023bvbwo", 
        };
        const newUser = await prismaCliente.user.create({ data: userData });
        if (newUser) {
            return true;
        }
        return false;
    }

    async delete(id: string): Promise<boolean> {
        const deletedUser = await prismaCliente.user.delete({
            where: {
                id: id,
            },
        })

        if (deletedUser) {
            return true;
        }
        return false;
    }

   async update(user: User): Promise<boolean>{
        const updatedUser = await prismaCliente.user.update({
            where: {
                id: user.id,
            },
            data: {
                nickname: undefined ,
                password: user.password ?? undefined,
                patent: user.patent ?? undefined,
                classes: user.classes ?? undefined,
                teans: user.teans ?? undefined,
                status: user.status ?? undefined,
                userType: user.userType ?? undefined,
                tag: user.tag ?? undefined,
                token: user.token ?? undefined,
                warnings: user.warnings ?? undefined,
                medals: user.medals ?? undefined,
                code: user.code ?? undefined,
                tokenActive: user.tokenActive ?? undefined,
                tokenIsNotValide: user.tokenIsNotValide ?? undefined 
            },
        });

        return !!updatedUser;
   }
}
