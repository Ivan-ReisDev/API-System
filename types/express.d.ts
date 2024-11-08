import express from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      id: string;
      nickname: string;
      patent: string;
      userType: string;
    };
  }
}
