import * as jwt from 'jsonwebtoken'
import { ExtractJwt, StrategyOptions } from "passport-jwt";

export interface JwtPayload {
  id: string
}

export function getJwtToken(user: { id: string }) {
  const payload: JwtPayload = { id: user.id }
  const token = jwt.sign(payload, jwtOptions.secretOrKey as string)
  return token
}

export const jwtOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: '934GWRUO2O840RWUOG240HUORWVQEU02G4ROJVDROVJADLAVPKQIRWOS',
};
