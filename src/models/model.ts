import { knex } from "./connection/knex";
import * as Knex from 'knex'
import * as Bookshelf from 'bookshelf'
import { migrationsConfig } from "../config/migrations";
import { seedsConfig } from "../config/seeds";
import { Users } from "./entities/users";
import bookshelf from "./bookshelf";

const debug = require("debug")("ts-express-fb-login:model")

export class Model {

  constructor(
    public knex: Knex,
    public bookshelf: Bookshelf,
  ) {}

  /**
   * Configure the entities in this model
   */
  Users = Users
  
  /**
   * Run the knex migrations and seeds configured for this model
   * @return {Promise<void>} The promise
   */
  init = async (): Promise<void> => {
    if (process.env.INIT_DB) {
      debug("Initializing database...")
      await this.knex.migrate.rollback(migrationsConfig)
      await this.knex.migrate.latest(migrationsConfig)
      debug("Running seeds...")
      return await this.knex.seed.run(seedsConfig)
    } else {
      debug("INIT_DB is false so no db init will occur")
    }
  }
}

export const model = new Model(knex, bookshelf)

export default model
