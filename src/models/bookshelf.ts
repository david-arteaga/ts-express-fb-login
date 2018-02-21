import * as Bookshelf from 'bookshelf'
import knex from './connection/knex';
import { upsert } from './bookshelf-plugins';

export const bookshelf = Bookshelf(knex)
bookshelf.plugin('registry');
bookshelf.plugin('pagination');
bookshelf.plugin(require('bookshelf-cascade-delete'));
bookshelf.plugin(upsert)

export default bookshelf
