const faker = require('faker');
// const csv = require('fast-csv');
const fs = require('fs');

// generate reviews, need 10 million
const generateReview = () => {
  // boolean used for several fields below
  const booleanGenerator = Math.floor(Math.random() * 2);

  // fields for database
  const rating = Math.floor(Math.random() * 5) + 1;
  const summary = faker.lorem.sentence(3);
  const recommend = (booleanGenerator === 1 ? 'true' : 'false');
  const response = (booleanGenerator === 1 ? faker.lorem.sentence(5) : '');
  const body = faker.lorem.sentences(5, 7);
  const review_date = faker.date.between('2020-05-01', '2020-07-09');
  const reviewer_name = faker.internet.userName();
  const reviewer_email = faker.internet.email();
  const verified = (booleanGenerator === 1 ? 'true' : 'false');
  const helpfulness_yes = Math.floor(Math.random() * 501);
  const helpfulness_no = Math.floor(Math.random() * 51);
  const product_id = Math.floor(Math.random() * 21);

  // return string of all the values
  return `${rating},${summary},${recommend},${response},${body},${review_date},${reviewer_name},${reviewer_email},${verified},${helpfulness_yes},${helpfulness_no},${product_id}\n`;
};

// console.log(generateReview());

const writeStream = fs.createWriteStream('reviews.csv');

const startWriting = (writeStream, encoding, done) => {
  let i = 100;
  function writing() {
    let canWrite = true;
    do {
      i--
      let review = generateReview();
      if (i === 0) {
        writeStream.write(review, encoding, done);
      } else {
        writeStream.write(review, encoding);
      }
    } while (i > 0 && canWrite) {
      if (i > 0 && !canWrite) {
        writeStream.once('drain', writing);
      }
    }
  }
  writing();
};

// write header line before invoking
writeStream.write(`rating,summary,recommend,response,body,review_date,reviewer_name,reviewer_email,verified,helpfulness_yes,helpfulness_no,product_id\n`, 'utf-8');

// invoke startWriting and pass in callback
startWriting(writeStream, 'utf-8', () => {
  writeStream.end();
});

// photos already generated from csv file, load directly from there
// characteristics table only has 6 items, created it in root directory

// generate characteristics_reviews join table
// for review ids 1-10 2 chars, 10-20 3 chars
// const chars = ['Size', 'Width', 'Comfort', 'Quality', 'Length', 'Fit'];
// let review_id = 1;
// const generateCharSize = () => {
//   const rating = Math.floor(Math.random() * 6);
//   return `${review_id},${1},${rating}\n`;
// };

// const generateCharWidth = () => {
//   const rating = Math.floor(Math.random() * 6);
//   return `${review_id},${2},${rating}\n`;
// };

// const generateCharComfort = () => {
//   const rating = Math.floor(Math.random() * 6);
//   return `${review_id},${3},${rating}\n`;
// };

// const generateCharQuality = () => {
//   const rating = Math.floor(Math.random() * 6);
//   return `${review_id},${4},${rating}\n`;
// };

// const generateCharLength = () => {
//   const rating = Math.floor(Math.random() * 6);
//   return `${review_id},${5},${rating}\n`;
// };

// const generateCharFit = () => {
//   const rating = Math.floor(Math.random() * 6);
//   return `${review_id},${6},${rating}\n`;
// };
