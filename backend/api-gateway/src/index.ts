import e, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app=e();

app.get('/', (req:Request, res:Response) => {
  res.send('Hello World!');
  return;
});

app.listen(process.env.PORT as string, () => {
  console.log('Server is running on port 5000');
});