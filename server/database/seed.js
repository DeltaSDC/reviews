const path = require('path');
const db = require('./index.js');

let time = new Date();

// seed chars table
const seedCharsTable = () => {
  console.log('started seeding characteristics', time.toTimeString());
  const pathToCSV = path.join(__dirname, 'chars.csv');
  const delimiter = ',';
  const sqlString = `COPY characteristics FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
  return db.query(sqlString);
};

// seed reviews table
const seedReviewsTable = () => {
  console.log('started seeding reviews', time.toTimeString());
  const pathToCSV = path.join(__dirname, 'reviews.csv');
  const delimiter = ',';
  const sqlString = `COPY reviews(rating,summary,recommend,response,body,review_date,reviewer_name,reviewer_email,verified,helpfulness_yes,helpfulness_no,product_id) FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
  return db.query(sqlString);
};

// // seed join table
// const seedJoinTable = () => {
//   console.log('started seeding join table', time.toTimeString());
//   const pathToCSV = path.join(__dirname, 'joinChar.csv');
//   const delimiter = ',';
//   const sqlString = `COPY reviews_characteristics FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
//   return db.query(sqlString);
// };

// // seed photos table
// const seedPhotosTable = () => {
//   console.log('started seeding photos', time.toTimeString());
//   const pathToCSV = path.join(__dirname, 'photos.csv');
//   const delimiter = ',';
//   const sqlString = `COPY photos FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
//   return db.query(sqlString);
// };

// index tables?

// invoke seeding functions
seedCharsTable()
  .then(() => console.log('Imported characteristics table', time.toTimeString()))
  .catch(console.log);

seedReviewsTable()
  .then(() => console.log('Imported characteristics table', time.toTimeString()))
  .catch(console.log);
