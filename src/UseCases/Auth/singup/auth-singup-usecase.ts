import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repositories/User/IUser-repository";
import { PasswordHasher } from "../../../lib/bcrypt/password-hash";
import { AuthSingUpDTO } from "./auth-singup-DTO";
import { IError } from "../../../../types/error.interface";

export class AuthSingUpUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHash:  PasswordHasher
    ) {}

    public async execute(data: AuthSingUpDTO): Promise<IError | boolean> {
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

    private async validate(data: AuthSingUpDTO): Promise<IError | null> {
        if (!data.nickname || typeof data.nickname !== 'string') {
            return { error:'Ops! Por favor informe o nickname', status: 400 };
        }

        if (!data.password || typeof data.password !== 'string') {
            return { error:'Ops! Por favor informe sua senha', status: 400 };
        }

        const userThereIsDB = await this.userRepository.findByNickname(data.nickname); 

        if (userThereIsDB) {
            return { error:'Ops! Este usuário já existe', status: 409 }; 
        }

        return null; 
    }
}
