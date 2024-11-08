import { IError } from "../../../../types/error.interface";
import { IUserRepository } from "../../../repositories/User/IUser-repository";
import { IDeleteUserRequestDTO } from "./users-delete-DTO";

export class UsersDeleteUserUseCase {
    constructor(private userRepository: IUserRepository) { }

    public async execute(data: IDeleteUserRequestDTO): Promise<IError | boolean> {
        try {
            const validationError = await this.validate(data);
            if (validationError) {
                return validationError;
            }
            await this.userRepository.delete(data.userDeleteId);
            return true;
        } catch (error) {
            console.error("Erro ao executar a operação:", error);
            return { error: "Erro inesperado ao executar a operação", status: 500 };
        }
    }

    private async validate(data: IDeleteUserRequestDTO): Promise<IError | null> {
        if (!data.userDeleteId || typeof data.userDeleteId !== 'string') {
            return { error: 'Ops! Por favor informe o id do usuário a ser deletado', status: 400 };
        }
        const userDelete = await this.userRepository.findById(data.userDeleteId);
        if (userDelete) {
            const user = await this.userRepository.findById(data.user.id);
            if (user && typeof user !== "boolean" && user.userType === "Admin") {
                return null
            }
            return { error: "Ops! permissões insuficiêntes", status: 403 }
        }
        return { error: "Ops! Este usuário não existe", status: 409 };

    }
}
