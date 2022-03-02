import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connect, MongooseError } from 'mongoose';

const { PORT, MONGO_DB } = process.env;
const app = express();

app.use(cors());
app.use(json());
app.use(morgan('combined'));

connect(MONGO_DB)
  .then(() => app.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}`)))
  .catch((err: MongooseError) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
