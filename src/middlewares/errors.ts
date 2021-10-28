import { RequestHandler } from 'express';

const errors: RequestHandler = (req, res, next) => {
  const oldRes = res.json;

  res.json = body => {
    res.json = oldRes;

    if (body instanceof Object && body.status) {
      return res.status(body.status).json({ error: body.error });
    }

    return res.json(body);
  };

  return next();
};

export default errors;
