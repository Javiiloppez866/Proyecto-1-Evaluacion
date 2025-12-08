const knex = require('knex');

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'exercises.db'
    },
    useNullAsDefault: true
});

exports.db = db;