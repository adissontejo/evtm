import Joi from 'joi';

import validator from './validator';

const sessionsValidator = {
  create: validator({
    body: Joi.object()
      .keys({
        user: Joi.object()
          .keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
          })
          .required(),
      })
      .required(),
  }),
};

export default sessionsValidator;
