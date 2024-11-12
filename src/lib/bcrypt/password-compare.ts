import bcrypt from 'bcrypt';

export class PasswordCompare {
    public async compare(password: string, passwordDB: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(password, passwordDB);
            if(isMatch){
                return true;
            }
        return false; 
    }
}

