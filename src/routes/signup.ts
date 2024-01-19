import express, { Request, Response } from 'express';
import path from 'path';
import { connectToDatabase } from '../services/dbconnect';
import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../utils/signup.html'));
});

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const usersCollection = await connectToDatabase();
  const userId = randomBytes(8).toString('hex'); // Generates a random user_id

  // Check if email already exists
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  await usersCollection.insertOne({ userId, email, password });
  res.json({ message: 'User added', userId });
  const authToken = jwt.sign({ userId }, 'dsahjdjk12h3h12jk', { expiresIn: '1h' });
  req.session.authToken = authToken;
  res.redirect('/');

});

export default router;
