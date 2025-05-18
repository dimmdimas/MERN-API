import { Request, Response } from "express";
import * as yup from "yup"
import usersModels from "../models/users.models";
import { encription } from "../utils/encryption";
import { getToken } from "../utils/jwt";
import { IReq } from "../middleware/auth.middleware";
import { log } from "console";

export type TRegister = {
    fullName: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
};

export type TLogin = {
    identifier: string,
    password: string
}

const registerValidate = yup.object({
    fullName: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required().email('Enter valid email'),
    password: yup.string().required().min(8),
    confirmPassword: yup.string().required().oneOf([yup.ref("password")])
})

export default {
    Register: async (req: Request, res: Response) => {
        /**
         #swagger.tags = ['Auth']
         #swagger.requestBody = {
         required: true,
         schema: {$ref: '#/components/schemas/RegisterRequest'}
         }
         */
        try {
            const { fullName, username, email, password, confirmPassword } = req.body as TRegister

            const result = await registerValidate.validate({ fullName, username, email, password, confirmPassword })

            const user = await usersModels.create(result)

            res.status(200).json({
                massage: 'success',
                data: user
            })
        } catch (error) {
            const err = error as Error
            res.status(400).json({
                massage: err.message
            })
        }

    },
    Login: async (req: Request, res: Response) => {
        /**
        #swagger.tags = ['Auth']
        #swagger.requestBody = {
            required: true, 
            schema: {$ref: "#/components/schemas/LoginRequest"}
        }
         */

        try {
            const { identifier, password } = req.body as TLogin;

            const pass = await encription(password);

            console.log(pass);


            const user = await usersModels.findOne({
                $and: [
                    {
                        $or: [
                            {
                                username: identifier
                            },
                            {
                                email: identifier
                            }
                        ]
                    },
                    {
                        password: pass
                    }
                ],
                isActived: true
            })

            if (user) {
                const token = await getToken({
                    id: user.id,
                    role: user.role
                });

                res.status(200).json({
                    massage: "User found",
                    data: token
                })
            }

            if (!user) {
                res.status(400).json({
                    massage: "User not found",
                    data: null
                })
            }

        } catch (error) {
            const err = error as Error;

            res.status(400).json({
                massage: err.message,
                data: null
            })
        }
    },
    Me: async (req: IReq, res: Response) => {
        /** 
        #swagger.tags = ['Auth']
        #swagger.security = [{
            "bearerAuth": []
    }] */
        try {
            const user = req.user

            if (user) {
                const result = await usersModels.findById(user.id)
                
                res.status(200).json({
                    massage: 'Welcome',
                    data: result
                })
            }

            if (!user) {
                res.status(403).json({
                    massage: 'unauthorized',
                    data: null
                });
            }
        } catch (error) {
            const err = error as Error

            res.status(400).json({
                massage: err.message
            })
        }
    },
    Activation: async (req: Request, res: Response) => {
        /**
         #swagger.tags = ['Auth']
         #swagger.requestBody = {
         required: true,
         schema: {$ref: '#/components/schemas/ActivationRequest'}
         }
         */
        try {
            const {code} = req.body as {code: string};

            const user = await usersModels.findOneAndUpdate({
                codeActivation: code
            }, {
                isActived: true
            }, {
                new: true
            })

            res.status(200).json({
                massage: 'user succes actived',
                data: user
            });
        } catch (error) {
            const err = error as Error

            res.status(400).json({
                massage: err.message,
                data: null
            })
        }
    }
}