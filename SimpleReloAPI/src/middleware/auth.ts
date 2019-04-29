import * as express from 'express';
import { UnathenticatedError } from '../middleware/errors';

interface User {
  name: string;
}

//Middleware sets the req.user object on all requests
//If req.user isn't set, it means we were missing necessary data to authorize the request, e.g. a cookie
const setUser: express.RequestHandler = async (req, res, next) => {
  req.user = {
    name: 'Bob'
  };

  return next();
};

//Middleware that ensures the user is authenticated
const checkAuth: express.RequestHandler = (req, res, next) => {
  if (!req.user) {
    return next(new UnathenticatedError('Authentication required.'));
  }
  return next();
};

export { setUser, checkAuth };
