import { BasePolicy } from '@ioc:Adonis/Addons/Bouncer'
import User from "App/Models/User";
import Note from "App/Models/Note";

export default class NotePolicy extends BasePolicy {

  public async view(user: User, note: Note) {
    return user.id === note.userId || user.isAdmin;
  }

  public async update(user: User, note: Note) {
    return user.id === note.userId || user.isAdmin;
  }

  public async delete(user: User, note: Note) {
    return user.id === note.userId || user.isAdmin;
  }

}
