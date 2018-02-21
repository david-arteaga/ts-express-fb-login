import bookshelf from "../bookshelf";

export class Users extends bookshelf.Model<Users> {
	get tableName() { return 'users' }
	get idAttribute() { return 'id' }

}

export namespace Users {
	export enum Related {
		
	}
}
