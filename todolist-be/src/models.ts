import { Schema, model } from 'mongoose';
import { Todo } from './interfaces';

const schema = new Schema<Todo>({
  title: { type: String, required: true, minlength: 1 },
  completed: { type: Boolean, required: true },
  id: { type: String || Schema.Types.ObjectId, required: false }
});

// The 'id' key can be set by application or database(the '_id' key will be set automatically)

export const TodoModel = model<Todo>('Todo', schema);
