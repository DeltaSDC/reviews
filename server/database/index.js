const { Pool } = require('pg');

const pool = new Pool({
  // user: 'lisawhite',
  host: 'localhost',
  database: 'reviews_service',
  port: 5432,
});

module.exports = {
  query: (text, params, callback) => pool.query(text, params, callback),
};
