import mongoose from "mongoose"
import { encription } from "../utils/encryption";
import { renderMailHTML, sendEmail } from "../utils/mail/mail";
import env from "../utils/env";

export interface IUser {
    fullName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: string,
    profilePicture: string,
    isActived: boolean,
    codeActivation: string,
    createdAt?: string
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

UserModel.pre('save', async function (next) {
    const user = this;
    user.password = await encription(user.password)
    user.confirmPassword = await encription(user.confirmPassword)

    user.codeActivation = encription(user.id);

    next();
})

UserModel.post('save', async function (doc, next) {
    try {
        const user = doc

        const contentMail = await renderMailHTML("registration-succes.ejs", {
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            createdAt: user.createdAt,
            activationLink: `${env.CLIENT_HOST}/auth/activation/code=${user.codeActivation}`
        })

        await sendEmail({
            from: env.EMAIL_SMTP_USER,
            to: user.email,
            subject: 'Aktivasi Akun',
            html: contentMail
        });

    } catch (error) {
        const err = error as Error;

        console.log(err);
        
    } finally {
        next();
    }
});


export default mongoose.model('users', UserModel);