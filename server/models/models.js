const db = require('../database/index.js');

const getReviewList = (product_id, callback) => {
  db.query('SELECT * FROM reviews', (err, res) => {
    if (err) {
      callback(err);
    } else {
      console.log('response from db', res.rows);
      callback(null, res.rows);
    }
  });
};

module.exports = {
  getReviewList,
};
