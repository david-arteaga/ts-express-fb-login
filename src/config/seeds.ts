import * as Knex from 'knex'

export const seedsConfig: Knex.SeedsConfig = {
  directory: './dist/models/migrations/seeds',
}

export default seedsConfig
