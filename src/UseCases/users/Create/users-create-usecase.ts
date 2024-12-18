import { IError } from "../../../../types/error.interface";
import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/User/IUser-repository";
import { PasswordHasher } from "../../../lib/bcrypt/password-hash";
import { ICreateUserRequestDTO } from "./users-create-DTO";

export class UsersCreateUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHash:  PasswordHasher
    ) {}

    public async Execute(data: ICreateUserRequestDTO): Promise<IError | boolean> {
        try {
            const validationError = await this.validate(data);
            if (validationError) {
                return validationError; 
            } 

            const hashedPassword: string = await this.passwordHash.hash(data.password); 
            
            const user = new User({
                ...data,
                password: hashedPassword,
            });

            await this.userRepository.save(user);
            return true; 
        } catch (error) {
            console.error("Erro ao executar a operação:", error); 
            return { error:'Erro interno no servidor', status: 500 }; 
        }
    }

 

    private async validate(data: ICreateUserRequestDTO): Promise<IError | null> {
        if (!data.nickname || typeof data.nickname !== 'string') {
            return { error:'Ops! Por favor informe o nickname', status: 400 };
        }

        if (!data.patent || typeof data.patent !== 'string') {
            return { error:'Ops! Por favor informe a patente', status: 400 };
        }

        const userThereIsDB = await this.userRepository.findByNickname(data.nickname); 
        if (userThereIsDB) {
            return { error:'Ops! Este usuário já existe', status: 409 }; 
        }

        return null; 
    }
}
