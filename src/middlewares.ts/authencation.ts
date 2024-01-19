import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express-session' {
    export interface SessionData {
      userId: string; // Add your session properties here
    }
  }

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  // Check if the user is logged in
  // This example assumes you're using session-based authentication
  
  if (req.session && req.session.userId) {
    next(); // User is logged in, proceed to the next middleware/route handler
  } else {
    res.status(401).send('Unauthorized: please login first'); // User is not logged in
  }
}

declare module 'express-session' {
  export interface SessionData {
    authToken: string; // Add your session properties here
  }
}

export function checkAuthToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authToken = req.session.authToken;
    if (!authToken) {
      throw new Error('No token provided');
    }
    
    jwt.verify(authToken, 'your_secret_key');
    next();
  } catch (error) {
    res.status(401).send('Unauthorized: Invalid token');
  }
}
