import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {column, beforeSave, beforeCreate, computed} from '@ioc:Adonis/Lucid/Orm'
import AppBaseModel from 'App/Lib/Model/AppModel'
import { UserTypeEnums } from 'App/Utils/Enums/UserEnums'
import { v4 as uuid } from 'uuid';

export default class User extends AppBaseModel {

  public static selfAssignPrimaryKey = true;

  @column({ isPrimary: true })
  public id: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public name: string;

  @column({
    columnName: "lastname",
  })
  public lastname: string;

  @column({
    columnName: "userType",
  })
  public userType: UserTypeEnums;

  @column()
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @computed({
    serializeAs: "fullname"
  })
  public get fullname() {
    return `${this.name} ${this.lastname}`;
  }

  @computed({
    serializeAs: "isAdmin"
  })
  public get isAdmin() {
    return this.userType === UserTypeEnums.ADMIN;
  }

  @beforeSave()
  public static async hashPassword(User: User) {
    if (User.$dirty.password) {
      User.password = await Hash.make(User.password)
    }
  }

  @beforeCreate()
  public static async createUUID(model: User) {
    model.id = uuid();
  }
}
