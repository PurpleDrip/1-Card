import e from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import registerRoute from "./routes/registerRoute"

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

app.use("/api/v1/auth",registerRoute);

app.listen(process.env.PORT as string, () => {
  console.log('Server is running on port 5000');
});

mongoose.connect(process.env.MONGO_URL as string).then(()=>{
  console.log('Connected to MongoDB');
}).catch((err)=>{
  console.error('Error connecting to MongoDB:', err);
});