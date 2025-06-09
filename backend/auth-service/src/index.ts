import e from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoute from "./routes/authRoute"
import docsRoute from "./routes/docsRoute"
import extensionRoute from "./routes/extensionRoute"

dotenv.config();
const app=e();

app.use(e.json());
app.use(e.urlencoded({ extended: true }));
app.use(cors({
  origin:["http://localhost:3000","http://localhost:3001"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use("/api/v1/auth",authRoute);
app.use("/api/v1/docs",docsRoute)
app.use("/api/v1/extension",extensionRoute)

app.listen(process.env.PORT as string, () => {
  console.log('Server is running on port 5000');
});

mongoose.connect(process.env.MONGO_URL as string).then(()=>{
  console.log('Connected to MongoDB');
}).catch((err)=>{
  console.error('Error connecting to MongoDB:', err);
});