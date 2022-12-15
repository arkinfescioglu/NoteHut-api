import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'note_categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {

      table
        .uuid('id')
        .primary()
        .index("note_categories_index_id");

      table
        .uuid('userId')
        .index("note_categories_index_userId");

      table.string("categoryName", 150);

      table.integer("categoryOrder").defaultTo("0");

      table.boolean("isMain").defaultTo("0");

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
