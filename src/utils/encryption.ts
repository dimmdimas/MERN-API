import crypto from "crypto"
import env from "./env"

export const encription = (password:string) => {
    return crypto.pbkdf2Sync(password, env.SECRET, 100000, 64, 'sha512').toString('hex');
}