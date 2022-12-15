import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import NoteCategory from 'App/Models/NoteCategory'

export default class NoteCategoryPolicy extends BasePolicy {
	// public async viewList(user: User) {}
	public async view(user: User, noteCategory: NoteCategory) {
	  return user.id === noteCategory.userId || user.isAdmin;
  }

	public async update(user: User, noteCategory: NoteCategory) {
    return user.id === noteCategory.userId || user.isAdmin;
  }

	public async delete(user: User, noteCategory: NoteCategory) {
    return user.id === noteCategory.userId || user.isAdmin;
  }

}
