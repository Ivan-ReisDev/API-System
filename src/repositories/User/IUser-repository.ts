import { User } from "../../entities/User";

export interface IUserRepository {
    findByNickname(nickname: string): Promise<User | boolean>;
    save(user: User): Promise<boolean>;
}