const db = require('../database/index.js');

const getReviewPhotos = (product_id, callback) => {
  db.query(`SELECT * FROM photos WHERE `)
};

const getReviewList = (product_id, callback) => {
  const queryString = `SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness
                          FROM reviews
                          WHERE product_id=${product_id}`;
  const innerjoin = `SELECT * FROM reviews r INNER JOIN photos p ON r.review_id = p.review_id WHERE r.product_id = ${product_id};`;
  const agg = `SELECT r.*, json_agg(p.*) FROM reviews r INNER JOIN photos p ON r.review_id = p.review_id WHERE r.product_id = ${product_id} GROUP BY r.review_id`;

  db.query(agg, (err, res) => {
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
