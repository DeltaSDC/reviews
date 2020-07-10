-- drop database if it exists
-- DROP DATABASE IF EXISTS reviews_service;

-- create database
-- CREATE DATABASE reviews_service;

-- delete any existing data from tables
DROP TABLE IF EXISTS reviews, photos, characteristics, reviews_characteristics CASCADE;

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
);

CREATE TABLE reviews_characteristics (
 id SERIAL PRIMARY KEY,
 review_id INTEGER REFERENCES reviews,
 char_id INTEGER REFERENCES characteristics,
 rating SMALLINT
);

-- sample data
INSERT INTO reviews (rating, summary, recommend, response, body, review_date, reviewer_name, reviewer_email, verified, helpfulness_yes, helpfulness_no, product_id) VALUES (3, 'I am enjoying wearing these shades', false, '', 'Comfortable and practical.', '2019-04-14T00:00:00.000Z', 'shortandsweeet', 'shortandsweet@yahoo.com', true, 0, 0, 10);
