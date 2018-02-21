import * as passport from 'passport'
import * as FacebookTokenStrategy from 'passport-facebook-token'
import { Strategy as JwtStrategy } from 'passport-jwt';
import { fbConfig } from './fb-config';
import { Profile } from 'passport-facebook-token';
import model from '../models/model';
import { User } from '../api/user-service';
import { jwtOptions, JwtPayload } from './jwt-config';
import { userService } from '../api/index';

const debug = require('debug')('ts-express-fb-login:passport-config.ts')

export const passportConfigureStrategies = () => {
  passport.use(new FacebookTokenStrategy(
    {
      clientID: fbConfig.appId,
      clientSecret: fbConfig.appSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        done(null, await upsertFbUser(accessToken, profile))
      } catch (e) {
        done(e, false)
      }
    }
  ))

  passport.use(new JwtStrategy(
    jwtOptions,
    async (jwtPayload: JwtPayload, done) => {
      try {
        done(null, (await userService.getUserForId(jwtPayload.id)) || false)
      } catch (e) {
        done(e, false)
      }
    }
  ))
}

const upsertFbUser = async (
  accessToken: string,
  { id, name, emails, photos }: Profile
): Promise<User> => {

  const user = await new model.Users({ id }).fetch()
  if (user) {
    // user already exists
    // update fb data
    const toUpdate: Partial<User> = {
      fullname: name.givenName + ' ' + name.familyName,
      email: (emails[0] || {}).value || '',
      fb_token: accessToken,
      photo_url: (photos[0] || {}).value || '',
    }
    await user.save(toUpdate, { patch: true })
    return user.toJSON() as User
  }
  // user does not exist

  const newUser: Partial<User> = {
    id,
    fullname: name.givenName + ' ' + name.familyName,
    email: (emails[0] || {}).value || '',
    fb_token: accessToken,
    photo_url: (photos[0] || {}).value || '',
  }

  // create new user
  // create all empty bets for user
  await new model.Users().save(newUser)

  return newUser as User
}
