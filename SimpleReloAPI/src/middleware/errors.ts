import * as express from 'express';

//Unathenticated, e.g. 401
export class UnathenticatedError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, UnathenticatedError.prototype);
  }
}

export class BadRequestError extends Error {
  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

const handleError: express.ErrorRequestHandler = (err, req, res, next) => {
  console.log('Handle error', err.constructor.name, '-', err.message, '-', err.stack); //TODO: add a real logger

  switch (err.constructor.name) {
    case UnathenticatedError.name:
      return res.status(401).json({ message: err.message });
    case BadRequestError.name:
      return res.status(400).json({ message: err.message });
    default:
      return next(err);
  }
};

export default handleError;
