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

const createCharsMetadata = (chars) => {
  // accepts an array of objects with chars join data, including char_id and rating for each review
  // create obj where key is name of char, and each char has an obj with the id of char and av value across all reviews
  let charsMetadata = {};
  let finalResult = {};
  const charOptions = {
    1: 'Size',
    2: 'Width',
    3: 'Comfort',
    4: 'Quality',
    5: 'Length',
    6: 'Fit',
  };
  for (let i = 0; i < chars.length; i += 1) {
    let currentCharId = chars[i].char_id;
    let currentCharValue = chars[i].rating;
    if (charsMetadata[currentCharId] === undefined) {
      charsMetadata[currentCharId] = [currentCharValue];
    } else {
      charsMetadata[currentCharId].push(currentCharValue);
    }
  }
  let charsPresent = Object.keys(charsMetadata);
  for (let j = 0; j < charsPresent.length; j += 1) {
    let currentChar = charsPresent[j];
    let charName = charOptions[currentChar];
    let ratings = charsMetadata[currentChar];
    let ratingsTotal = 0;
    for (let k = 0; k < ratings.length; k += 1) {
      ratingsTotal += ratings[k];
    }
    let ratingsAverage = ratingsTotal / ratings.length;
    finalResult[charName] = {
      'id': currentChar,
      'value': ratingsAverage,
    };
  }
  return finalResult;
};

module.exports = {
  createRatingsMetadata,
  createRecommendedMetadata,
  createCharsMetadata,
};
