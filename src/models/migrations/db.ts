import * as Knex from 'knex'

export function up(knex: Knex, Promise: PromiseConstructor) {
  return knex.schema
    .createTableIfNotExists('users', table => {
      table.string('id').primary()
      table.string('fullname').notNullable()
      table.string('email').notNullable()
      table.string('fb_token').notNullable()
      table.string('photo_url').notNullable()
    })
}

export function down(knex: Knex, Promise: PromiseConstructor) {
  return knex.schema
    .dropTableIfExists('users')
}
