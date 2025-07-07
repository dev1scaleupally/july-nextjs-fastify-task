/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table('emails', table => {
    table.index(['to']);
    table.index(['cc']);
    table.index(['bcc']);
    table.index(['subject']);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table('emails', table => {
    table.dropIndex(['to']);
    table.dropIndex(['cc']);
    table.dropIndex(['bcc']);
    table.dropIndex(['subject']);
  });
}; 