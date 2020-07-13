const createRatingsMetadata = (ratings) => {
  // accepts an array of ratings objects where key is "rating" and value is the rating value
  // need to create object where key is rating value and value is the frequency
  let ratingsMetadata = {};
  // iterate over the array
  for (let i = 0; i < ratings.length; i += 1) {
    // for the current object, if ratings value is not in ratingsMetadata, add it with a value of 1
    // if ratings exists in ratingsMetadata, then increment by 1
    const currentRating = ratings[i].rating;
    if (ratingsMetadata[currentRating] === undefined) {
      ratingsMetadata[currentRating] = 1;
    } else {
      ratingsMetadata[currentRating] += 1;
    }
  }
  return ratingsMetadata;
};

const createRecommendedMetadata = (recommended) => {
  // accepts an array of recommend objects where key is "recommend" and value boolean t or f
  // need to create an object where key is recommend (0 for f, 1 for t) and value is frequency
  let recommendedMetadata = {};
  for (let i = 0; i < recommended.length; i += 1) {
    let currentRec = recommended[i].recommend;
    if (currentRec === true) {
      currentRec = 1;
    } else {
      currentRec = 0;
    }
    // console.log(currentRec);
    if (recommendedMetadata[currentRec] === undefined) {
      recommendedMetadata[currentRec] = 1;
    } else {
      recommendedMetadata[currentRec] += 1;
    }
    // console.log(recommendedMetadata);
  }
  return recommendedMetadata;
};

module.exports = {
  createRatingsMetadata,
  createRecommendedMetadata,
};
