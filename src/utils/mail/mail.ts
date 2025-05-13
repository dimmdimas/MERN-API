import nodemailer from 'nodemailer'
import env from '../env'
import ejs from 'ejs'
import fs from 'fs'
import path from 'path'

const tranporter = nodemailer.createTransport({
    service: env.EMAIL_SMTP_SERVICE_NAME,
    host: env.EMAIL_SMTP_HOST,
    port: env.EMAIL_SMTP_PORT,
    secure: env.EMAIL_SMTP_SECURE,
    auth: {
        user: env.EMAIL_SMTP_USER,
        pass: env.EMAIL_SMTP_PASS
    },
    requireTLS: true
})

export interface ISendMail {
    from: string, 
    to: string,
    subject: string,
    html: string
}

export const sendEmail = async ({...mailParams}: ISendMail)=> {
    const result = await tranporter.sendMail({
        ...mailParams
    })

    return result;
}

export const renderMailHTML = async (template: string, data: any)=> {
    const content = await ejs.renderFile(path.join(__dirname, `templates/${template}`))

    return content;
};


