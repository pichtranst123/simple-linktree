import express, { Request, Response } from 'express';
import { connectToDatabase } from '../services/dbconnect';
import path from 'path';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../utils/addProfile.html'));
});


router.post('/', async (req: Request, res: Response) => {
    try {
      // Connect to the 'users' collection instead of 'profiles'
      const usersCollection = await connectToDatabase();
  
      // Extract the user's ID and profile data from the request body
      const { userId, github, facebook, linkedin, twitter } = req.body;
  
      // Find the user by their user ID and update their profile
      const updateResult = await usersCollection.updateOne(
        { userId }, 
        { $set: { profiles: { github, facebook, linkedin, twitter } } },
        { upsert: true }  // This creates a new document if the user doesn't exist
      );
  
      if (updateResult.modifiedCount === 0 && updateResult.upsertedCount === 0) {
        throw new Error('Profile update failed');
      }
  
      res.status(201).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error updating profile' });
    }
  });

// Implement additional CRUD routes here

export default router;
