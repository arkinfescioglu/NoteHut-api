import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UserTypeEnums } from 'App/Utils/Enums/UserEnums'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
        .primary()
        .unique()
        .index("user_id_index")
      table.string('email', 255)
        .index("users_email_index")
        .unique()
        .notNullable()
      table.string('password', 180).notNullable()
      table.string("name", 100);
      table.string("lastname", 100);
      table.string('remember_me_token').nullable()
      table.string("userType", 100).defaultTo(UserTypeEnums.USER);
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true);
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
