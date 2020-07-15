const path = require('path');
const db = require('./index.js');

// seed chars table
const seedCharsTable = () => {
  console.log('started seeding characteristics', new Date().toUTCString());
  const pathToCSV = path.join(__dirname, 'chars.csv');
  const delimiter = ',';
  const sqlString = `COPY characteristics FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
  return db.query(sqlString);
};

// seed reviews table
const seedReviewsTable = () => {
  console.log('started seeding reviews', new Date().toUTCString());
  const pathToCSV = path.join(__dirname, 'reviews.csv');
  const delimiter = ',';
  const sqlString = `COPY reviews(rating,summary,recommend,response,body,date,reviewer_name,reviewer_email,verified,helpfulness,helpfulness_no,product_id,reported) FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
  return db.query(sqlString);
};

// // seed join table
const seedJoinTable = () => {
  console.log('started seeding join table', new Date().toUTCString());
  const pathToCSV = path.join(__dirname, 'joinChar.csv');
  const delimiter = ',';
  const sqlString = `COPY reviews_characteristics(review_id,char_id,rating) FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
  return db.query(sqlString);
};

// seed photos table
const seedPhotosTable = () => {
  console.log('started seeding photos', new Date().toUTCString());
  const pathToCSV = path.join(__dirname, 'reviews_photos.csv');
  const delimiter = ',';
  const sqlString = `COPY photos FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
  return db.query(sqlString);
};

// invoke seeding functions
console.log('begin invoking functions', new Date().toUTCString());
seedCharsTable()
  .then(() => console.log('Imported characteristics table', new Date().toUTCString()))
  .then(seedReviewsTable)
  .then(() => console.log('Imported reviews table', new Date().toUTCString()))
  .then(seedJoinTable)
  .then(() => console.log('Imported join table', new Date().toUTCString()))
  .then(seedPhotosTable)
  .then(() => console.log('Imported photos table', new Date().toUTCString()))
  .catch(console.log);
