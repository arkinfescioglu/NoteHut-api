import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'notes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {

      table
        .uuid('id')
        .primary()
        .index("notes_index_id");

      table
        .uuid('userId')
        .index("notes_index_userId");

      table
        .uuid('categoryId')
        .index("notes_index_categoryId");

      table.string("noteTitle", 150).notNullable();

      table.text("noteContent");

      table.boolean("isImportant").defaultTo(false);
      table.boolean("isTrash").defaultTo(false);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */

      table.timestamps(true, true);

    });
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
