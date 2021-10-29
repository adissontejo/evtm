import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';

const auth: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Invalid token.' });
  }

  const [, jwt] = token.split(' ');

  verify(jwt, process.env.JWT_SECRET || 'privatekey', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    res.locals.session = {
      userId: decoded.sub,
    };

    return next();
  });

  return null;
};

export default auth;
