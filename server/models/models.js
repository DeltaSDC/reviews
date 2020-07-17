const db = require('../database/index.js');

// called from get list route
const getReviewList = (product_id, callback) => {
  const queryString = `SELECT *, coalesce((SELECT array_to_json(array_agg(row_to_json(x))) FROM (SELECT * FROM photos WHERE reviews.review_id = photos.review_id) x), '[]') AS photos FROM reviews WHERE product_id = ${product_id} AND reported = false`;

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
  const queryString = `SELECT (rating) FROM reviews WHERE product_id = ${product_id} AND reported = false`;
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
  const queryString = `SELECT (recommend) FROM reviews WHERE product_id = ${product_id} AND reported = false`;
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
  const queryString = `SELECT rc.* FROM reviews_characteristics rc INNER JOIN reviews r ON rc.review_id = r.review_id WHERE r.product_id = ${product_id} AND reported = false`;
  db.query(queryString, (err, res) => {
    if (err) {
      callback(err);
    } else {
      console.log('got chars from join table in db');
      callback(null, res.rows);
    }
  });
};

// called from POST new review route
const addProductReview = (reviewInfo, callback) => {
  // console.log('reviewinfo from model', reviewInfo);
  const { product_id, rating, summary, body, recommend, reviewer_name, reviewer_email } = reviewInfo;
  const date = new Date();
  const dateToString = date.toUTCString();
  const queryString = `INSERT INTO reviews(rating, summary, recommend, response, body, date, reviewer_name, reviewer_email, verified, helpfulness, helpfulness_no, product_id, reported) VALUES ('${rating}', '${summary}', '${recommend}', '', '${body}', '${dateToString}', '${reviewer_name}', '${reviewer_email}', 'true', '${0}', '${0}', '${product_id}', 'false') RETURNING review_id`;
  db.query(queryString, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log('added review to db');
      callback(null, res.rows[0].review_id);
    }
  });
};

// called from POST new review route
const addReviewPhotos = (review_id, photos, callback) => {
  let queryString = `INSERT INTO photos(review_id, url) VALUES `;
  for (let i = 0; i < photos.length; i += 1) {
    queryString += `('${review_id}', '${photos[i]}')`;
    if (i !== photos.length - 1) {
      queryString += ', ';
    }
  }
  queryString += ' RETURNING id';
  console.log('query for photos', queryString);
  db.query(queryString, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log('added photo to db', res.rows);
      callback(null, res.rows);
    }
  });
};

// called from POST new review route
const addReviewChars = (review_id, characteristics, callback) => {
  let queryString = `INSERT INTO reviews_characteristics(review_id, char_id, rating) VALUES `;
  const charArr = Object.keys(characteristics);
  for (let i = 0; i < charArr.length; i += 1) {
    queryString += `('${review_id}', '${charArr[i]}', '${characteristics[charArr[i]]}')`;
    if (i !== charArr.length - 1) {
      queryString += ', ';
    }
  }
  queryString += ' RETURNING id';
  console.log('query for chars', queryString);
  db.query(queryString, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log('added characteristics to db', res.rows);
      callback(null, res.rows);
    }
  });
};

// PUT for marking helpful
const markReviewHelpful = (review_id, callback) => {
  const queryString = `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE review_id = '${review_id}' RETURNING helpfulness`;
  db.query(queryString, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log('marked review as helpful', res.rows[0].helpfulness);
      callback(null, res.rows[0].helpfulness);
    }
  });
};

// PUT for reporting
const reportReview = (review_id, callback) => {
  const queryString = `UPDATE reviews SET reported = 'true' WHERE review_id = '${review_id}' RETURNING reported`;
  db.query(queryString, (err, res) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log('reported review', res.rows[0].reported);
      callback(null, res.rows[0].reported);
    }
  });
};

module.exports = {
  getReviewList,
  getRatings,
  getRecommends,
  getChars,
  addProductReview,
  addReviewPhotos,
  addReviewChars,
  markReviewHelpful,
  reportReview,
};
