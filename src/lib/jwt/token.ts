import config from "config";
import jwt from "jsonwebtoken"

export class GenerateToken {
    public async token(id: string) {
        const JWTSECRET = config.get<number>("JWTSECRET").toString(); 
        return jwt.sign(
          { id },
          JWTSECRET,
          {
            expiresIn: "3d",
          })
    }}