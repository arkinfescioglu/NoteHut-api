import { DateTime } from 'luxon';
import { column, beforeCreate } from '@ioc:Adonis/Lucid/Orm';
import { v4 as uuid } from 'uuid';
import AppBaseModel from 'App/Lib/Model/AppModel';

export default class NoteCategory extends AppBaseModel {

  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column({ columnName: "userId" })
  public userId: string;

  @column({ columnName: "categoryName" })
  public categoryName: string;

  @column({ columnName: "categoryOrder" })
  public categoryOrder: number;

  @column({ columnName: "isMain" })
  public isMain: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeCreate()
  public static async createUUID(model: NoteCategory) {
    model.id = uuid();
  }
}
