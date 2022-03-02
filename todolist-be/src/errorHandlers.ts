import { MongooseError } from 'mongoose';
import type { Response, Request } from "express";

export function httpErrorHandler(err: MongooseError, req: Request, res: Response) {
  if (err) {
    console.error(`MongoDB ${err.name}:`, new Date().toUTCString(), req.method, req.url);

    if (err.name === 'DocumentNotFoundError' || err.name === 'CastError') {
      res.status(404).send('Task not found');
    } else res.status(503).send();

  } else if (!req.params.id) {
    res.status(400).send(`The request ${req.url} isn't correct`);
  } else res.status(500).send();
}
