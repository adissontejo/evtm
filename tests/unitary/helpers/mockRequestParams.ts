import { NextFunction, Request, Response } from 'express';

const mockRequestParams = () => {
  const req = {
    body: {},
    query: {},
    params: {},
    headers: {},
  } as Request;

  const res = {
    locals: {},
    json: jest.fn(() => res),
    send: jest.fn(() => res),
    status: jest.fn(() => res),
  } as any as Response;

  const next = jest.fn() as NextFunction;

  const reset = () => {
    req.body = {};
    req.query = {};
    req.params = {};
    req.headers = {};

    res.locals = {};
  };

  return { req, res, next, reset };
};

export default mockRequestParams;
