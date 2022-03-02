import 'dotenv/config';
import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connect, MongooseError } from 'mongoose';
import jsonstream from 'jsonstream';
import { TodoModel } from './models';
import { Todo } from './interfaces';
import { paginationHandler } from './utils';

const { PORT, MONGO_DB } = process.env;
const app = express();

app.use(cors());
app.use(json());
app.use(morgan('combined'));

app.get('/todos/:id', (req, res) => {
  TodoModel
    .findById(req.params.id)
    .then(todo => todo ? res.send(todo) : res.status(404).send('Task not found'))
    .catch((err: MongooseError) => console.error(err));
});

app.get('/todos', (req, res) => {
  try {
    TodoModel
      .find({}, {}, paginationHandler(req.query))
      .cursor()
      .pipe(jsonstream.stringify())
      .pipe(res)
  } catch(err) { console.error(err); }
});

app.post('/todos', (req, res) => {
  new TodoModel(req.body).save()
    .then(todo => res.send(todo))
    .catch((err: MongooseError) => console.error(err));
});

app.patch('/todos/:id', (req, res) => {
  TodoModel
    .findByIdAndUpdate(req.params.id, req.body as Todo, { new: true })
    .then(todo => res.send(todo))
    .catch((err: MongooseError) => console.error(err));
});

connect(MONGO_DB)
  .then(() => app.listen(PORT, () => console.log(`Server is running on: http://localhost:${PORT}`)))
  .catch((err: MongooseError) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
