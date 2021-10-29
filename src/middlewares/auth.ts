import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Invalid token.' });
  }

  const jwt = token.replace('Bearer ', '');

  try {
    const { sub } = verify(jwt, process.env.JWT_SECRET || 'privatekey');

    res.locals.session = {
      userId: sub,
    };

    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

export default auth;
