const express = require('express');

const router = express.Router();
const controller = require('../controllers/controllers.js');

// set up routes
router.get('/:product_id/list', controller.getReviewList);
router.get('/:product_id/meta', controller.getReviewMetadata);
router.post('/:product_id', controller.addProductReview);
router.put('/helpful/:review_id', controller.markReviewHelpful);
router.put('/report/:review_id', controller.reportReview);

module.exports = router;
