const {Pool} = require('pg');
const pool = new Pool({
    port: 5432,
    user: 'postgres',
    database: 'Flixem',
    password: 'Diego199',
    host: 'localhost'
});


module.exports = pool;