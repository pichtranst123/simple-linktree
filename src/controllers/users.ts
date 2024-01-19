import { Request, Response } from "express";

export const loginController = (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (email === 'pichtran@gmail.com' && password === 123) {
        res.json({
            message: "Login success"
        });
    } else {
        res.status(400).json({
            message: "Invalid credentials"
        });
    }
};
