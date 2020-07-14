const path = require('path');
const db = require('./index.js');

let ts = Date.now();
let dateObj = new Date(ts);

// seed chars table
const seedCharsTable = () => {
  console.log('started seeding characteristics', dateObj.toTimeString(), ts);
  const pathToCSV = path.join(__dirname, 'chars.csv');
  const delimiter = ',';
  const sqlString = `COPY characteristics FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
  return db.query(sqlString);
};

// seed reviews table
const seedReviewsTable = () => {
  console.log('started seeding reviews', dateObj.toTimeString(), ts);
  const pathToCSV = path.join(__dirname, 'reviews.csv');
  const delimiter = ',';
  const sqlString = `COPY reviews(rating,summary,recommend,response,body,date,reviewer_name,reviewer_email,verified,helpfulness,helpfulness_no,product_id,reported) FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
  return db.query(sqlString);
};

// // seed join table
const seedJoinTable = () => {
  console.log('started seeding join table', dateObj.toTimeString(), ts);
  const pathToCSV = path.join(__dirname, 'joinChar.csv');
  const delimiter = ',';
  const sqlString = `COPY reviews_characteristics(review_id,char_id,rating) FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
  return db.query(sqlString);
};

// seed photos table
const seedPhotosTable = () => {
  console.log('started seeding photos', dateObj.toTimeString(), ts);
  const pathToCSV = path.join(__dirname, 'photos.csv');
  const delimiter = ',';
  const sqlString = `COPY photos FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
  return db.query(sqlString);
};

// invoke seeding functions
console.log('begin invoking functions', dateObj.toTimeString(), ts);
seedCharsTable()
  .then(() => console.log('Imported characteristics table', dateObj.toTimeString(), ts))
  .then(seedReviewsTable)
  .then(() => console.log('Imported reviews table', dateObj.toTimeString(), ts))
  .then(seedJoinTable)
  .then(() => console.log('Imported join table', dateObj.toTimeString(), ts))
  .then(seedPhotosTable)
  .then(() => console.log('Imported photos table', dateObj.toTimeString(), ts))
  .catch(console.log);
