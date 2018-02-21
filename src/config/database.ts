import * as Knex from 'knex'

export const config: Knex.Config = {
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'mercapp_dev_db',
    user : 'mercapp_dev',
    password : 'pass',
  },
  debug: (process.env.DEBUG_KNEX || '').toLowerCase() === 'true',
}

export default config
