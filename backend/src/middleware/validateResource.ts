// a curried function that validates a request against a Zod schema
// so when we reach our controller, we know that the body is what we expect it to be

import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      // if our schema can not be parsed
      return res
        .status(400)
        .json({ error: e.issues.map((issue: any) => issue.message).join(', ') });
    }
  };

export default validateResource;
