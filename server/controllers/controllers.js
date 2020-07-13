const path = require('path');
// const reviewList = require(path.join(__dirname, './sampleData.js'));
const reviewData = require('../sampleData.js');
const model = require('../models/models.js');
const helpers = require('./helperFunctions.js');

// get a review list
const getReviewList = (req, res) => {
  console.log(req.params);
  const { product_id, page, count, sort } = req.params;
  model.getReviewList(product_id, (err, results) => {
    if (err) {
      console.log('error getting review list');
      res.status(404);
    } else {
      console.log('got review list');
      res.status(200).json({
        product: product_id,
        page,
        count,
        results,
      });
    }
  });
};

// get review metadata
const getReviewMetadata = (req, res) => {
  console.log(req.params);
  const { product_id } = req.params;
  let ratings;
  let recommended;
  let characteristics;
  model.getRatings(product_id, (err, results) => {
    if (err) {
      console.log('error getting review metadata');
      res.status(404);
    } else {
      console.log('got review metadata');
      ratings = helpers.createRatingsMetadata(results);
      model.getRecommends(product_id, (err1, results1) => {
        if (err1) {
          console.log('error getting recs metadata');
          res.status(404);
        } else {
          console.log('got ratings metadata');
          recommended = helpers.createRecommendedMetadata(results1);
          model.getChars(product_id, (err2, results2) => {
            if (err1) {
              console.log('error getting chars metadata');
              res.status(404);
            } else {
              console.log('got chars metadata', results2);
              characteristics = helpers.createCharsMetadata(results2);
              console.log(characteristics);
              res.status(200).json({
                product_id,
                ratings,
                recommended,
                characteristics,
              });
            }
          });
        }
      });
    }
  });
};

// add a review for a product
const addProductReview = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const { product_id } = req.params;
  const { rating, summary, body, recommend, name, email, photos, characteristics } = req.params;
  // if (err) {
  //   console.log('error adding a product review');
  //   res.status(404);
  // } else {
  console.log('added product review');
  res.status(201).json({
    product: product_id,
  });
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
  res.status(204).json({
    review: review_id,
  });
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
  console.log('reported review');
  res.status(204).json({
    review: review_id,
  });
  // }
};

module.exports = {
  getReviewList,
  getReviewMetadata,
  addProductReview,
  markReviewHelpful,
  reportReview,
};
