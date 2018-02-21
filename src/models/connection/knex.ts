import * as Knex from 'knex'
import config from '../../config/database';

export const knex = Knex(config)

export default knex
