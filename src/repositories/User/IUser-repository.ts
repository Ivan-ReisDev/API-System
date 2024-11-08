import { User } from "../../entities/User";

export interface IUserRepository {
    findByNickname(nickname: string): Promise<User | boolean>;
    findById(id:string): Promise<User | boolean>;
    save(user: User): Promise<boolean>;
    delete(id: string): Promise<boolean>;
    update(user: User): Promise<boolean>;
}