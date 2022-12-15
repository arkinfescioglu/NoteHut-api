import { DateTime } from 'luxon';
import {column, beforeCreate, hasOne, HasOne} from '@ioc:Adonis/Lucid/Orm';
import { v4 as uuid } from 'uuid';
import AppBaseModel from 'App/Lib/Model/AppModel';
import NoteCategory from "App/Models/NoteCategory";

export default class Note extends AppBaseModel {

  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column({ columnName: "userId" })
  public userId: string;

  @column({ columnName: "categoryId" })
  public categoryId: string;

  @column({ columnName: "noteTitle" })
  public noteTitle: string;

  @column({ columnName: "noteContent" })
  public noteContent: string;

  @column({ columnName: "isImportant" })
  public isImportant: boolean;

  @column({ columnName: "isTrash" })
  public isTrash: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => NoteCategory, {
    localKey: "categoryId",
    foreignKey: "id",
    serializeAs: "category"
  })
  public category: HasOne<typeof NoteCategory>;

  @beforeCreate()
  public static async createUUID(model: Note) {
    model.id = uuid();
  }
}
