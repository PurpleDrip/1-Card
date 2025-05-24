import e from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app=e();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(process.env.PORT as string, () => {
  console.log('Server is running on port 3000');
});