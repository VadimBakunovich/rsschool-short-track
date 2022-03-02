import 'dotenv/config';
import express from 'express';
import { connect, MongooseError } from 'mongoose';

const { PORT, MONGO_DB } = process.env;
const app = express();

connect(MONGO_DB)
  .then(() => app.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}`)))
  .catch((err: MongooseError) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
