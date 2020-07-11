const faker = require('faker');
// const csv = require('fast-csv');
const fs = require('fs');
const path = require('path');
let time = new Date();

// generate reviews, need 10 million
const generateReview = () => {
  // boolean used for several fields below
  const booleanGenerator = Math.floor(Math.random() * 2);

  // fields for database
  const rating = Math.floor(Math.random() * 5) + 1;
  const summary = faker.lorem.sentence(3);
  const recommend = (booleanGenerator === 1 ? 'true' : 'false');
  const response = (booleanGenerator === 1 ? faker.lorem.sentence(5) : '');
  const body = faker.lorem.sentences(5);
  const review_date = faker.date.between('2020-05-01', '2020-07-09');
  const reviewer_name = faker.internet.userName();
  const reviewer_email = faker.internet.email();
  const verified = (booleanGenerator === 1 ? 'true' : 'false');
  const helpfulness_yes = Math.floor(Math.random() * 501);
  const helpfulness_no = Math.floor(Math.random() * 51);
  const product_id = Math.floor(Math.random() * 20) + 1;

  // return string of all the values
  return `${rating},${summary},${recommend},${response},${body},${review_date},${reviewer_name},${reviewer_email},${verified},${helpfulness_yes},${helpfulness_no},${product_id}\n`;
};

// console.log(generateReview());
const seedDirectory = path.join(__dirname, 'reviews.csv');
const writeStream = fs.createWriteStream(seedDirectory);

const startWriting = (writer, encoding, done) => {
  console.log('started writing data', time.toTimeString());
  let i = 100;
  function writing() {
    let canWrite = true;
    do {
      i -= 1;
      const review = generateReview();
      if (i === 0) {
        writer.write(review, encoding, done);
      } else {
        writer.write(review, encoding);
      }
    } while (i > 0 && canWrite) {
      if (i > 0 && !canWrite) {
        writer.once('drain', writing);
      }
    }
  }
  writing();
};

// write header line before invoking
writeStream.write(`rating,summary,recommend,response,body,review_date,reviewer_name,reviewer_email,verified,helpfulness_yes,helpfulness_no,product_id\n`, 'utf-8');

// invoke startWriting and pass in callback
startWriting(writeStream, 'utf-8', () => {
  console.log('finished writing data', time.toTimeString());
  writeStream.end();
});

// photos already generated from csv file, load directly from there
// characteristics table only has 6 items, created it in root directory
