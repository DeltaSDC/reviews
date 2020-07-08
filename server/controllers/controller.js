const path = require('path');
// const reviewList = require(path.join(__dirname, './sampleData.js'));
const reviewList = require('../sampleData.js');

// get a review list
const getReviewList = (req, res) => {
  console.log(req.params);
  const { product_id, page, count, sort } = req.params;
  // if (err) {
  //   console.log('error getting review list');
  //   res.status(404);
  // } else {
  console.log('got review list');
  res.status(200).json({
    product: product_id,
    page,
    count,
    results: reviewList,
  });
  // }
};

// get review metadata
const getReviewMetadata = (req, res) => {
  console.log(req.params);
  const { product_id } = req.params;
  // if (err) {
  //   console.log('error getting review metadata');
  //   res.status(404);
  // } else {
  console.log('got review metadata');
  res.status(200).json({
    product: product_id,
    ratings: {},
    recommended: {},
    characteristics: {},
  });
  // }
};

// add a review for a product
const addProductReview = (req, res) => {
  console.log(req.params);
  const { product_id, rating, summary, body, recommend, name, email, photos, characteristics } = req.params;
  // if (err) {
  //   console.log('error adding a product review');
  //   res.status(404);
  // } else {
  console.log('added product review');
  res.status(201);
  // }
};

// mark a review as helpful
const markReviewHelpful = (req, res) => {
  console.log(req.params);
  const { review_id } = req.params;
  // if (err) {
  //   console.log('error marking review as helpful');
  //   res.status(404);
  // } else {
  console.log('marked review as helpful');
  res.status(204);
  // }
};

// report review
const reportReview = (req, res) => {
  console.log(req.params);
  const { review_id } = req.params;
  // if (err) {
  //   console.log('error reporting review');
  //   res.status(404);
  // } else {
  console.log('error reporting review');
  res.status(204);
  // }
};

module.exports = {
  getReviewList,
  getReviewMetadata,
  addProductReview,
  markReviewHelpful,
  reportReview,
};
