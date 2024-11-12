import bcrypt from 'bcrypt';

export class PasswordHasher {
    public async hash(password: string): Promise<string> {
        const saltRounds = 10; 
        return bcrypt.hash(password, saltRounds);
    }
}