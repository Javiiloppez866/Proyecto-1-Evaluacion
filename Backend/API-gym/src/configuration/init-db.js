const { db } = require('./database');

async function initDatabase() {
    await db.schema.hasTable('exercises').then(async (exists) => {
        if (!exists) {
            await db.schema.createTable('exercises', (table) => {
                table.increments('id').primary();
                table.string('name').notNullable().unique();
                table.integer('duration').notNullable();
                table.string('difficulty').notNullable();
                table.integer('calories').defaultTo(0);
                table.datetime('date').defaultTo(db.fn.now());
                table.boolean('active').defaultTo(true);
                table.text('notes').defaultTo('');
                table.string('order').notNullable();
            });
            console.log('✅ Tabla exercises creada');
        }
    });
}

module.exports = initDatabase;