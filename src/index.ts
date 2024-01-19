import express, { Request, Response } from 'express';
import signupRouter from './routes/signup'; 
import { connectToDatabase } from './services/dbconnect';
import path from 'path';
import homepageRouter from './routes/homepage';
import profileRouter from './routes/profile';
import { checkAuthToken  } from './middlewares.ts/authencation';  // Import the middleware

const app = express();
const port = 3000;


async function startServer() {
  await connectToDatabase();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); 
  app.use('/signup', signupRouter); 
  app.use('/', checkAuthToken, homepageRouter);
  app.use('/profile', checkAuthToken, profileRouter);

  app.listen(port, () => {
    console.log('Server is running on port 3000');
  });
}

startServer().catch(console.error);