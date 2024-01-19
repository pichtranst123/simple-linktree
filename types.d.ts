import session from 'express-session';

declare module 'express-session' {
  export interface SessionData {
    userId: string; // Add your session properties here
  }
}