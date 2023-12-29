import express, {Request, Response} from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
const router = express.Router();


router.post('/register',[
    check("firstname", "First Name Is Required").isString(),
    check("lastname", "last Name Is Required").isString(),
    check("email", "Email Is Required").isEmail(),
    check("password", "Password with 6 or More Char required").isLength({
        min: 6,
    }),

    ], async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()})
        }

    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if (user) {
            return res.status(400).json({ message: "user already exists"});
        }
        user = new User(req.body)
        await user.save();
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "1d",    
        }
        
        );
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        })
        return res.sendStatus(200);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong"}); 
    }

})

export default router;

function check(arg0: string, arg1: string) {
    throw new Error('Function not implemented.');
}
function validationResult(req: express.Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>) {
    throw new Error('Function not implemented.');
}

