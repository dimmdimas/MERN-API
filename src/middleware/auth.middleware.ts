import { NextFunction, Request, Response } from "express";
import { getUserData, IToken } from "../utils/jwt";

export interface IReq extends Request {
    user?: IToken
}

export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const auth = req.headers.authorization?.replace('Bearer ', '');
        
        if (!auth) {
            res.status(403).json({
                massage: 'unauthorized',
                data: null
            });
        };

        if (auth) {
            const user = getUserData(auth)
            
            if (!user) {
                res.status(403).json({
                    massage: 'unauthorized',
                    data: null
                });
            }

            (req as IReq).user = user
            next();
        };

    } catch (error) {
        const err = error as Error

        res.status(400).json({
            massage: err.message,
            data: null
        })
    }

}