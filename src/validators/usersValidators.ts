import Joi from 'joi';

import useValidator from './validator';

const usersValidators = {
  create: useValidator({
    body: Joi.object().keys({
      user: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      }),
    }),
  }),
};

export default usersValidators;
