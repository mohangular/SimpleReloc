// Extend the express request object to add a user field, which
// will be populated during authentication.

declare namespace Express {
  export interface Request {
    user?: {
      name: string;
    };
  }
}
