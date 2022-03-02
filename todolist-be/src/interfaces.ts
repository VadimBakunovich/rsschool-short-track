import { Types } from 'mongoose';

export interface Todo {
  title: string;
  completed: boolean;
  id?: string | Types.ObjectId;
}
// The 'id' key can be set by application or database(the '_id' key will be set automatically)

export interface Query {
  page?: string;
  limit?: string;
}
