import mongoose from "mongoose"
import { encription } from "../utils/encryption";

export interface IUser {
    fullName: string, 
    username: string, 
    email: string, 
    password: string, 
    confirmPassword: string, 
    role: string, 
    profilePicture: string, 
    isActived: boolean, 
    codeActivation: string
};

const shema = mongoose.Schema;

const UserModel = new shema<IUser>({
    fullName: {
        type: shema.Types.String,
        required: true
    },
    username: {
        type: shema.Types.String,
        required: true
    },
    email: {
        type: shema.Types.String,
        required: true
    },
    password: {
        type: shema.Types.String,
        required: true
    }, 
    confirmPassword: {
        type: shema.Types.String,
        required: true
    },
    role: {
        type: shema.Types.String,
        enum: ["User", "Admin"],
        default: "User"
    },
    profilePicture: {
        type: shema.Types.String,
        default: 'user.jpg'
    },
    isActived: {
        type: shema.Types.Boolean,
        default: false
    }, 
    codeActivation: {
        type: shema.Types.String,
    }
}, {
    timestamps: true
})

UserModel.pre<IUser>('save', async function (next) {
    const user = this;
    user.password = await encription(user.password)
    user.confirmPassword = await encription(user.confirmPassword)

    next();
})

export default mongoose.model('users', UserModel);