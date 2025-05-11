import jwt from 'jsonwebtoken'
import env from './env'
import { IUser } from '../models/users.models'
import { Types } from 'mongoose'

export interface IToken extends Omit<IUser, "fullName" | "username" | "email" | "password" | "confirmPassword" | "profilePicture" | "isActived" | "codeActivation"> {
    id?: Types.ObjectId
}

export const getToken = (user:IToken):string => {
    return jwt.sign(user, env.SECRET, {
        expiresIn: "1h"
    })
}

export const getUserData = (token: string) => {
    return jwt.verify(token, env.SECRET) as IToken
}