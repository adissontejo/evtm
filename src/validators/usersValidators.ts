import Joi from 'joi';

import validator from './validator';

const usersValidators = {
  create: validator({
    body: Joi.object()
      .keys({
        user: Joi.object()
          .keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
          })
          .required(),
      })
      .required(),
  }),

  delete: validator({
    body: Joi.object()
      .keys({
        user: Joi.object()
          .keys({
            password: Joi.string().min(8).required(),
          })
          .required(),
      })
      .required(),
  }),

  getData: validator({}),
};

export default usersValidators;
