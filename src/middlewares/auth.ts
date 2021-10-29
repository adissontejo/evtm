import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

const auth: RequestHandler = (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ');

  if (!token) {
    return res.status(401).json({ error: 'Invalid token.' });
  }

  verify(token, process.env.JWT_SECRET || 'defaultkey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    res.locals.session = {
      userId: decoded.sub,
    };

    return next();
  });

  return next();
};

export default auth;
