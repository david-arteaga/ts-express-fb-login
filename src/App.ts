import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import * as passport from 'passport'
import * as cors from 'cors'
import { apiRouter } from './routes/api-router';
import { passportConfigureStrategies } from './auth/passport-config';
import { authRouter } from './routes/auth-router';

const debug = require('debug')('ts-express-fb-login:App.ts')

class App {

  express: express.Application

  constructor() {
    debug('Initializing application...')
    this.express = express()
    this.middleware()
    this.configurePassport()
    this.routes()
  }

  private configurePassport = () => {
    passportConfigureStrategies()
    this.express.use(passport.initialize())
  }

  private middleware = () => {
    this.express.use(cors())
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
  }

  private routes = () => {
    this.express.use('/api/v1/auth', authRouter)
    this.express.use('/api/v1', authJwt, apiRouter)
  }

}

const authJwt = passport.authenticate('jwt', { session: false })

export const app = new App().express

export default app
