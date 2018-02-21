import { BaseService } from "./base/base-service";

const debug = require('debug')('ts-express-fb-login:UserService')

export class UserService extends BaseService {
  async getUserForId(id: string): Promise<User | null> {
    const user = await new this.model.Users({ id }).fetch()
    return user ? user.toJSON() as User : null
  }

}

export interface User {
  id: string
  fullname: string
  email: string
  fb_token: string
  photo_url: string
}
