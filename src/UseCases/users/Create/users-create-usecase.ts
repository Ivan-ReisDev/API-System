import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/User/IUser-repository";
import { ICreateUserRequestDTO } from "./users-create-DTO";
import bcrypt from "bcrypt";

export class UsersCreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    public async Execute(data: ICreateUserRequestDTO): Promise<string | boolean> {
        try {
            const validationError = await this.validate(data);
            if (validationError) {
                return validationError; 
            }

            const hashedPassword = await this.hashPassword(data.password); 
            
            const user = new User({
                ...data,
                password: hashedPassword,
            });

            await this.userRepository.save(user);
            return true; 
        } catch (error) {
            console.error("Erro ao executar a operação:", error); 
            return "Erro inesperado ao executar a operação."; 
        }
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10; 
        return bcrypt.hash(password, saltRounds);
    }

    private async validate(data: ICreateUserRequestDTO): Promise<string | null> {
        if (!data.nickname || typeof data.nickname !== 'string') {
            return 'Ops! Por favor informe o nickname.';
        }

        if (!data.patent || typeof data.patent !== 'string') {
            return 'Ops! Por favor informe a patente.';
        }

        const userThereIsDB = await this.userRepository.findByNickname(data.nickname); 
        if (userThereIsDB) {
            return "Usuário já existe"; 
        }

        return null; 
    }
}
