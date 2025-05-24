import jwt from 'jsonwebtoken';
import { Request, Response} from 'express';
import { IUser } from '../model/User';

export const appendCookie = (req: Request, res: Response): void => {
    const cookieData = res.locals.cookieData ;

    const token=jwt.sign({
        id:cookieData._id.toString(),
        walletPublicAddress:cookieData.walletPublicAddress,
        NCid:cookieData.NCid,
    },process.env.JWT_SECRET as string,{
        expiresIn: 24 * 60 * 60, // 1 day in seconds
    });

    res.cookie('NullCardOfficialToken',token,{  
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day in milliseconds
        sameSite: "strict",
    });

    return;
}