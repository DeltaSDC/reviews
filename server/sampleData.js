// sample data for get review list
const reviewList = [
  {
    review_id: 5,
    rating: 3,
    summary: 'I am enjoying wearing these shades',
    recommend: 0,
    response: '',
    body: 'Comfortable and practical.',
    date: '2019-04-14T00:00:00.000Z',
    reviewer_name: 'shortandsweeet',
    helpfulness: 5,
    photos: [
      {
        id: 1,
        url: 'urlplaceholder/review_5_photo_number_1.jpg',
      },
      {
        id: 2,
        url: 'urlplaceholder/review_5_photo_number_2.jpg',
      },
    ],
  },
  {
    review_id: 3,
    rating: 4,
    summary: 'I am liking these glasses',
    recommend: 0,
    response: 'Glad you are enjoying the product!',
    body: 'They are very dark. But that is good because I am in very sunny spots',
    date: '2019-06-23T00:00:00.000Z',
    reviewer_name: 'bigbrotherbenjamin',
    helpfulness: 5,
    photos: [],
  },
];

const reviewMetadata = {
  product_id: 2,
  ratings: {
    2: 1,
    3: 1,
    4: 2,
  },
  recommended: {
    0: 5,
  },
  characteristics: {
    Size: {
      id: 14,
      value: 4.0000,
    },
    Width: {
      id: 15,
      value: 3.5000,
    },
    Comfort: {
      id: 16,
      value: 4.0000,
    },
  },
};

module.exports = {
  reviewList,
  reviewMetadata,
};
