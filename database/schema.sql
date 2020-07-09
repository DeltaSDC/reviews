CREATE DATABASE reviews_service;

CREATE TABLE reviews (
 review_id SERIAL PRIMARY KEY,
 rating SMALLINT,
 summary VARCHAR(60),
 recommend BOOLEAN,
 response VARCHAR(1000),
 body VARCHAR(1000),
 review_date TIMESTAMP,
 reviewer_name VARCHAR(60),
 reviewer_email VARCHAR(60),
 verified BOOLEAN,
 helpfulness_yes INTEGER,
 helpfulness_no INTEGER,
 product_id INTEGER
);

CREATE TABLE photos (
 photo_id SERIAL PRIMARY KEY,
 photo_url TEXT,
 review_id INTEGER REFERENCES reviews
);

CREATE TABLE characteristics (
 char_id SERIAL PRIMARY KEY,
 char_name VARCHAR(10)
)

CREATE TABLE reviews_characteristics (
 id SERIAL PRIMARY KEY,
 review_id INTEGER REFERENCES reviews,
 char_id INTEGER REFERENCES characteristics,
 rating SMALLINT
)
