import Joi, { ObjectSchema } from 'joi';
import { RequestHandler } from 'express';

type ValidationObject = {
  body?: ObjectSchema;
  query?: ObjectSchema;
  params?: ObjectSchema;
  headers?: ObjectSchema;
};

const validator = (object: ValidationObject) => {
  const schema = Joi.object().keys(object);

  const validate: RequestHandler = (req, res, next) => {
    const testReq = {};

    Object.keys(object).forEach(item => {
      testReq[item] = req[item];
    });

    const result = schema.validate(testReq);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return next();
  };

  return validate;
};

export default validator;
