import * as Knex from 'knex'

export const migrationsConfig: Knex.MigratorConfig = {
  directory: './dist/models/migrations',
  tableName: 'migrations',
}

export default migrationsConfig
