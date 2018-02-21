import * as passport from 'passport'
import { BaseRouter } from './base/base-router';
import { getJwtToken } from '../auth/jwt-config';
import { User } from '../api/user-service';
import { Request, Response } from 'express'
import { catch_async } from './base/util';
import { userService } from '../api/index';

const debug = require('debug')('ts-express-fb-login:AuthRouter')

/**
 * #baseRoute: /api/v1/auth
 * Initialize the router for api calls
 */
class AuthRouter extends BaseRouter {

  init() {
    // /facebook expects a body: { access_token: string }
    this.router.post(
      '/facebook',
      passport.authenticate('facebook-token', { session: false }),
      async (req, res) => {
        const jwtToken = getJwtToken(req.user)
        res.json({
          jwtToken,
          user: req.user
        } as AuthResponse)
      }
    )

    this.router.get('/userExists', catch_async(this.userExists))
  }

  async userExists(req: Request, res: Response) {
    const id = req.query.id || ''
    const user = await userService.getUserForId(id)
    res.json({
      exists: user && true || false
    })
  }

}

export const authRouter = new AuthRouter().router

interface AuthResponse {
  jwtToken: string
  user: User
}
