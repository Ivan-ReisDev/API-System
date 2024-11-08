import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/User/IUser-repository";
import bcrypt from "bcrypt";
import { IDeleteUserRequestDTO } from "./users-delete-DTO";

export class UsersDeleteUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    public async Execute(data: IDeleteUserRequestDTO): Promise<string | boolean> {
        try {
            const validationError = await this.validate(data);
            if (validationError) {
                return validationError; 
            }
            await this.userRepository.delete(data.userDeleteId);
            return true; 
        } catch (error) {
            console.error("Erro ao executar a operação:", error); 
            return "Erro inesperado ao executar a operação."; 
        }
    }

    private async validate(data: IDeleteUserRequestDTO): Promise<string | null> {
        if (!data.userDeleteId || typeof data.userDeleteId !== 'string') {
            return 'Ops! Por favor informe o id do usuário a ser deletado.';
        }
        const userDelete = await this.userRepository.findById(data.userDeleteId);
        if (userDelete) {
            const user  = await this.userRepository.findById(data.user.id); 
            if(user && typeof user !== "boolean" && user.userType === "Admin") {
                return null
            }
            return "Ops! permissões insuficiêntes"
        }
        return "Ops! Este usuário não existe"; 
  
    }
}
