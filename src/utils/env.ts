import dotenv from "dotenv"
import { bool } from "yup";

dotenv.config();


export default {
    PORT: process.env.PORT || "",
    DATABASE: process.env.DATABASE || "",
    SECRET: process.env.SECRET || "",
    EMAIL_SMTP_SECURE: Boolean(process.env.EMAIL_SMTP_SECURE) || false,
    EMAIL_SMTP_PASS: process.env.EMAIL_SMTP_PASS || '',
    EMAIL_SMTP_USER: process.env.EMAIL_SMTP_USER || '',
    EMAIL_SMTP_PORT: Number(process.env.EMAIL_SMTP_PORT) || 465,
    EMAIL_SMTP_HOST: process.env.EMAIL_SMTP_HOST || '',
    EMAIL_SMTP_SERVICE_NAME: process.env.EMAIL_SMTP_SERVICE_NAME || '',
    CLIENT_HOST: process.env.CLIENT_HOST || 'http://localhost:3000'
}
