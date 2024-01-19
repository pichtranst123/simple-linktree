import express, { Request, Response } from 'express';
import path from 'path';

const router = express.Router();

// Implement CRUD operations here
// For example, to create a new profile:
router.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../utils/homepage.html'));
});


export default router;
