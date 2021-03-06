const path = require('path');
// const reviewList = require(path.join(__dirname, './sampleData.js'));
const reviewData = require('../sampleData.js');
const model = require('../models/models.js');
const helpers = require('./helperFunctions.js');
const cache = require('../cache/index.js');

// get a review list
const getReviewList = (req, res) => {
  console.log(req.params);
  const {
    product_id,
    page,
    count,
    sort,
  } = req.params;
  const cacheKey = `${product_id}List`;
  cache.getFromCache(cacheKey, (error, resultsCache) => {
    if (error) {
      console.log('error getting from cache');
    }
    if (resultsCache !== null) {
      console.log('got data from cache');
      res.status(200).json(JSON.parse(resultsCache));
    } else {
      model.getReviewList(product_id, (err, results) => {
        if (err) {
          console.log('error getting review list');
          res.status(404);
        } else {
          console.log('got review list');
          cache.addToCache(cacheKey, {
            product: product_id,
            page,
            count,
            results,
          });
          res.status(200).json({
            product: product_id,
            page,
            count,
            results,
          });
        }
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
  const cacheKey = `${product_id}Meta`;
  cache.getFromCache(cacheKey, (error, resultsCache) => {
    if (error) {
      console.log('error getting from cache');
    }
    if (resultsCache !== null) {
      console.log('got data from cache');
      res.status(200).json(JSON.parse(resultsCache));
    } else {
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
                  console.log('got chars metadata');
                  characteristics = helpers.createCharsMetadata(results2);
                  cache.addToCache(cacheKey, {
                    product_id,
                    ratings,
                    recommended,
                    characteristics,
                  });
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
    }
  });
};

// add a review for a product
const addProductReview = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const { product_id } = req.params;
  const { rating, summary, body, recommend, name, email, photos, characteristics } = req.body;
  const reviewsTableInfo = {
    product_id: parseInt(product_id),
    rating,
    summary,
    body,
    recommend,
    reviewer_name: name,
    reviewer_email: email,
  };
  // console.log('reviewstableinfo', reviewsTableInfo);
  model.addProductReview(reviewsTableInfo, (err, review_id) => {
    if (err) {
      console.log('error adding a product review', err);
      res.status(404);
    } else {
      console.log('added product review', review_id);
      // insert photos
      if (photos.length > 0) {
        model.addReviewPhotos(review_id, photos, (err1, results) => {
          if (err1) {
            console.log('error adding review photos', err1);
            res.status(404);
          } else {
            console.log('added review photos', results);
            // insert characteristics
            if (JSON.stringify(characteristics) !== JSON.stringify({})) {
              model.addReviewChars(review_id, characteristics, (err2, results2) => {
                if (err2) {
                  console.log('error adding review chars', err2);
                  res.status(404);
                } else {
                  console.log('added review chars', results2);
                  res.status(201).json({
                    product_id,
                  });
                }
              });
            } else {
              console.log('no characteristics');
              res.status(201).json({
                product_id,
              });
            }
          }
        });
      } else {
        console.log('no photos');
        if (JSON.stringify(characteristics) !== JSON.stringify({})) {
          model.addReviewChars(review_id, characteristics, (err2, results2) => {
            if (err2) {
              console.log('error adding review chars', err2);
              res.status(404);
            } else {
              console.log('added review chars', results2);
              res.status(201).json({
                product_id,
              });
            }
          });
        } else {
          console.log('no characteristics');
          res.status(201).json({
            product_id,
          });
        }
      }
    }
  });
};

// mark a review as helpful
const markReviewHelpful = (req, res) => {
  console.log(req.params);
  const { review_id } = req.params;
  model.markReviewHelpful(review_id, (err, results) => {
    if (err) {
      console.log('error marking review as helpful');
      res.status(404);
    } else {
      console.log('marked review as helpful', results);
      res.status(204).end();
    }
  });
};

// report review
const reportReview = (req, res) => {
  console.log(req.params);
  const { review_id } = req.params;
  model.reportReview(review_id, (err, results) => {
    if (err) {
      console.log('error reporting review');
      res.status(404);
    } else {
      console.log('reported review', results);
      res.status(204).end();
    }
  });
};

module.exports = {
  getReviewList,
  getReviewMetadata,
  addProductReview,
  markReviewHelpful,
  reportReview,
};
