const db = require('../database/index.js');

// called from get list route
const getReviewList = (product_id, callback) => {
  // const queryString1 = `SELECT review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness
  //                         FROM reviews
  //                         WHERE product_id=${product_id}`;
  // const innerjoin = `SELECT * FROM reviews r INNER JOIN photos p ON r.review_id = p.review_id WHERE r.product_id = ${product_id};`;
  const queryString = `SELECT r.*, json_agg(p.*) FROM reviews r INNER JOIN photos p ON r.review_id = p.review_id WHERE r.product_id = ${product_id} GROUP BY r.review_id`;

  db.query(queryString, (err, res) => {
    if (err) {
      callback(err);
    } else {
      console.log('review list response from db');
      callback(null, res.rows);
    }
  });
};

// called from get metadata route
const getRatings = (product_id, callback) => {
  const queryString = `SELECT (rating) FROM reviews WHERE product_id = ${product_id}`;
  db.query(queryString, (err, res) => {
    if (err) {
      callback(err);
    } else {
      console.log('got ratings from db');
      callback(null, res.rows);
    }
  });
};

// called from get metadata route
const getRecommends = (product_id, callback) => {
  const queryString = `SELECT (recommend) FROM reviews WHERE product_id = ${product_id}`;
  db.query(queryString, (err, res) => {
    if (err) {
      callback(err);
    } else {
      console.log('got recs from db');
      callback(null, res.rows);
    }
  });
};

// called from get metadata route
const getChars = (product_id, callback) => {
  const queryString = `SELECT rc.* FROM reviews_characteristics rc INNER JOIN reviews r ON rc.review_id = r.review_id WHERE r.product_id = ${product_id}`;
  db.query(queryString, (err, res) => {
    if (err) {
      callback(err);
    } else {
      console.log('got chars from join table in db');
      callback(null, res.rows);
    }
  });
};

module.exports = {
  getReviewList,
  getRatings,
  getRecommends,
  getChars,
};
