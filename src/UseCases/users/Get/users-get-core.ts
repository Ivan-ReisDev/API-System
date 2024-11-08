import { IError } from "../../../../types/error.interface";
import { IRequestUser } from "../../../../types/user-interfaces";
import { prismaCliente } from "../../../repositories/database/prisma";

interface PaginatedResult<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
}

export class UsersGetCore {
    page: number = 1;
    limit: number = 10;
    user: IRequestUser; 
  
    constructor(page: number, limit: number, user: IRequestUser) {
        this.page = page;
        this.limit = limit;
        this.user = user;
    }

    public async Execute(): Promise<PaginatedResult<IRequestUser> | IError> {
        try {
            const result = await this.listUsers();
            return result;
        } catch (error) {
            console.error("Erro ao executar a operação:", error);
            return { error: "Erro inesperado ao executar a operação.", status: 500 };
        }
    }

    private async listUsers(): Promise<PaginatedResult<IRequestUser> | IError> {
        try {
            const totalItems = await prismaCliente.user.count();
            const totalPages = Math.ceil(totalItems / this.limit);
            const currentPage = Math.max(1, Math.min(this.page, totalPages));
            const offset = (currentPage - 1) * this.limit;

            const users = await prismaCliente.user.findMany({
                skip: offset,
                take: this.limit,
                select: {
                    id: true,
                    nickname: true,
                    patent: true,
                    userType: true,
                },
            });

            return {
                data: users,
                totalItems,
                totalPages,
                currentPage,
            };
        } catch (error) {
            console.error("Erro ao listar usuários:", error);
            return { error: "Ops! Erro ao listar usuários.", status: 500 };
        }
    }
}
