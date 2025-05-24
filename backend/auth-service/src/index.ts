import e from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app=e();

app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL as string,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.listen(process.env.PORT as string, () => {
  console.log('Server is running on port 5000');
});