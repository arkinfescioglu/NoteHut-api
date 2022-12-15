import BaseRepository from "App/Lib/Repository/BaseRepository";
import NoteCategory from "App/Models/NoteCategory";
import {inject} from "@adonisjs/fold";

@inject()
export default class NoteCategoryRepository extends BaseRepository<typeof NoteCategory> {
  constructor() {
    super(NoteCategory);
  }

  public async findByUserId(userId: string, orderBy: "created_at" | "categoryOrder") {
    this.checkParam(userId);
    return await this.modelWithQuery()
      .where({
        userId: userId,
      })
      .orderBy(orderBy, "desc")
      .exec();
  }

  public async getMainByUserId(userId: string) {
    this.checkParam(userId);
    return await this.modelWithQuery()
      .where({
        userId: userId,
        isMain: true
      })
      .first();
  }

  public async isAuthor(id:any, userId: string) {
    this.checkParam(userId);
    const category = await this.modelWithQuery()
      .select(["id", "userId"])
      .where({
        id: id
      })
      .first();
    if (category) {
      return category.userId === userId;
    }
    return false;
  }
}
