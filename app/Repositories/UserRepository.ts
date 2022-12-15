import BaseRepository from "App/Lib/Repository/BaseRepository";
import User from "App/Models/User";
import { inject } from "@adonisjs/fold";

@inject()
export default class UserRepository extends BaseRepository<typeof User> {
    constructor() {
        super(User);
    }
}