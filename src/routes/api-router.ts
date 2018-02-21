import { BaseRouter } from "./base/base-router";
import { userRouter } from './user-router';

const debug = require('debug')('ts-express-fb-login:ApiRouter')

/**
 * #baseRoute: /api/v1
 * Initialize the router for api calls
 */
class ApiRouter extends BaseRouter {

  init() {
    this.router.use('/user', userRouter)
  }

}

export const apiRouter = new ApiRouter().router
