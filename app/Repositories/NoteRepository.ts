import BaseRepository from "App/Lib/Repository/BaseRepository";
import Note from "App/Models/Note";
import { inject } from "@adonisjs/fold";

@inject()
export default class NoteRepository extends BaseRepository<typeof Note> {
    constructor() {
        super(Note);
    }

    public async fetchAll(input: IGetAll) {
      return await this.modelWithQuery()
        .preload("category", categoryQuery => {
          categoryQuery.select([
            "id",
            "categoryName",
            "categoryOrder",
            "isMain"
          ])
        })
        .where({ userId: input.userId})
        .where(q => {

          if(!!input.categoryId) {
            q.where("categoryId", input.categoryId);
          }

          if(!!input.search) {
            q.where("noteTitle", "like", `%${input.search}%`);
          }

          if(typeof input.isImportant !== "undefined" && input.isImportant !== null) {
            q.where("isImportant", input.isImportant === "true");
          }

          if(input.isTrash) {
            q.where("isTrash", input.isTrash === "true");
          } else {
            q.where("isTrash", false);
          }

        })
        .limit(25)
        .offset(input.offset)
        .orderBy("created_at", "desc")
        .exec();
    }
}

interface IGetAll {
  categoryId: string;
  userId: string;
  offset: number;
  search: any;
  isImportant: any;
  isTrash: any;
}
