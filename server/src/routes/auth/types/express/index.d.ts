// src/types/express.d.ts

import { Request } from 'express';
import { FileArray } from 'express-fileupload';

declare module 'express-serve-static-core' {
  interface Request {
    files?: {
      [fieldname: string]: FileArray;
    };
  }
}
