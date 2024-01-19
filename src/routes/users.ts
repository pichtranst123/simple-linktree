import { Router } from 'express';
import { loginValidator } from '../middlewares/users';
import { loginController } from '../controllers/users';

const userRouter = Router();

userRouter.post('/users', loginValidator, loginController);

export default userRouter;
