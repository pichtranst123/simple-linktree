import express, { Request, Response } from 'express';
import userRouter from './routes/users'; // Ensure the path is correct
import { connectToDatabase } from './services/dbconnect';
const app = express();
const port = 3000;

async function startServer() {
  await connectToDatabase();

app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Hellso World');
});

app.use('/login', userRouter); 

app.listen(port, () => {
  console.log('Server is running on port 3000');
});
}
startServer().catch(console.error);
