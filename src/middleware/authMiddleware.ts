import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      res.status(500).json({ error: 'JWT secret not configured' });
      return;
    }
    const decoded = jwt.verify(token, secret) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(403).json({ error: 'Token inválido' });
  }
};
