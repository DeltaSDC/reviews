const faker = require('faker');
const fs = require('fs');
const path = require('path');
let time = new Date();
// let review_id;

// generate characteristics_reviews join table
// for review ids 1-10 2 chars, 10-20 3 chars
// chars have ids 1-6
// const chars = ['Size', 'Width', 'Comfort', 'Quality', 'Length', 'Fit'];
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

const seedDirectory = path.join(__dirname, 'joinChar.csv');
const writeStream = fs.createWriteStream(seedDirectory);

const startWriting = (writer, encoding, done) => {
  console.log('started writing data', time.toTimeString());
  function writingSize() {
    let i = 199;
    let review_id = 1;
    let canWrite = true;
    do {
      i -= 1;
      review_id += 1;
      const joinTableRow = `${review_id},${1},${Math.floor(Math.random() * 5) + 1}\n`;
      if (i === 0) {
        writer.write(joinTableRow, encoding, done);
      } else {
        writer.write(joinTableRow, encoding);
      }
    } while (i > 0 && canWrite) {
      if (i > 0 && !canWrite) {
        writer.once('drain', writingSize);
      }
    }
  }
  // write width
  function writingWidth() {
    let i = 49;
    let review_id = 1;
    let canWrite = true;
    do {
      i -= 1;
      review_id += 2;
      const joinTableRow = `${review_id},${2},${Math.floor(Math.random() * 5) + 1}\n`;
      if (i === 0) {
        writer.write(joinTableRow, encoding, done);
      } else {
        writer.write(joinTableRow, encoding);
      }
    } while (i > 0 && canWrite) {
      if (i > 0 && !canWrite) {
        writer.once('drain', writingWidth);
      }
    }
  }
  // write Comfort
  function writingComfort() {
    let i = 24;
    let review_id = 1;
    let canWrite = true;
    do {
      i -= 1;
      review_id += 2;
      const joinTableRow = `${review_id},${3},${Math.floor(Math.random() * 5) + 1}\n`;
      if (i === 0) {
        writer.write(joinTableRow, encoding, done);
      } else {
        writer.write(joinTableRow, encoding);
      }
    } while (i > 0 && canWrite) {
      if (i > 0 && !canWrite) {
        writer.once('drain', writingComfort);
      }
    }
  }
  // write Quality
  function writingQuality() {
    let i = 24;
    let review_id = 1;
    let canWrite = true;
    do {
      i -= 1;
      review_id += 2;
      const joinTableRow = `${review_id},${4},${Math.floor(Math.random() * 5) + 1}\n`;
      if (i === 0) {
        writer.write(joinTableRow, encoding, done);
      } else {
        writer.write(joinTableRow, encoding);
      }
    } while (i > 0 && canWrite) {
      if (i > 0 && !canWrite) {
        writer.once('drain', writingQuality);
      }
    }
  }
  // write Length
  function writingLength() {
    let i = 24;
    let review_id = 1;
    let canWrite = true;
    do {
      i -= 1;
      review_id += 3;
      const joinTableRow = `${review_id},${5},${Math.floor(Math.random() * 5) + 1}\n`;
      if (i === 0) {
        writer.write(joinTableRow, encoding, done);
      } else {
        writer.write(joinTableRow, encoding);
      }
    } while (i > 0 && canWrite) {
      if (i > 0 && !canWrite) {
        writer.once('drain', writingLength);
      }
    }
  }
  // write Fit
  function writingFit() {
    let i = 9;
    let review_id = 1;
    let canWrite = true;
    do {
      i -= 1;
      review_id += 5;
      const joinTableRow = `${review_id},${6},${Math.floor(Math.random() * 5) + 1}\n`;
      if (i === 0) {
        writer.write(joinTableRow, encoding, done);
      } else {
        writer.write(joinTableRow, encoding);
      }
    } while (i > 0 && canWrite) {
      if (i > 0 && !canWrite) {
        writer.once('drain', writingFit);
      }
    }
  }
  // invoke all the functions
  writingSize();
  writingWidth();
  writingComfort();
  writingQuality();
  writingLength();
  writingFit();
};

// write header line before invoking
writeStream.write(`review_id,char_id,rating\n`, 'utf-8');

// invoke startWriting and pass in callback
startWriting(writeStream, 'utf-8', () => {
  console.log('finished writing data', time.toTimeString());
  writeStream.end();
});
