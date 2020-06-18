
exports.up = function(knex) {
     return knex.schema
          .createTable('jobTitle', tbl => {
               tbl.increments()
               tbl.string('name', 128).notNullable().unique()
          })
          
          .createTable('employees', tbl => {
               tbl.increments()
               tbl.string('username', 128).notNullable().unique().index();
               tbl
                    .string('jobTitle_name')
                    .notNullable()
                    .references('jobTitle.name')
                    .onDelete('RESTRICT')
                    .onUpdate('CASCADE')
          })
};

exports.down = function(knex) {
     return knex.schema
          .dropTableIfExists('jobTitle')
          .dropTableIfExists('employees')
};
