import { Request, Response } from 'express';
import { BaseRouter } from "./base/base-router";
import { catch_async } from './base/util';

const debug = require('debug')('ts-express-fb-login:UserRouter')

/**
 * #baseRoute: /api/v1/user
 * Initialize the router for api calls
 */
class UserRouter extends BaseRouter {

  init() {
    this.router.get('', catch_async(this.getUser))
  }

  async getUser(req: Request, res: Response) {
    res.json(req.user)
  }

}

export const userRouter = new UserRouter().router
