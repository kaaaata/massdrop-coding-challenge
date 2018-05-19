exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('jobs', (job) => {
    job.string('id').notNullable().primary(); // shortid
    job.string('url').notNullable(); // target url
    job.text('html').notNullable(); // target url HTML in string format
  }),
]);
  
exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTableIfExists('jobs'),
]);
