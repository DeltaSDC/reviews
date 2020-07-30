# MAZE Mercantile Reviews Service

> MAZE Mercantile is an e-commerce clothing retailer. For this project I inherited front-end legacy code and was tasked with building out an optimized back-end that could handle high web traffic. I worked with two other teammates, each of us focusing on a different microservice; I focused on the Reviews Service.

## Achievements and Optimizations

- Seeded a PostgreSQL database with over 22 million records.
- Optimized PostgreSQL query times by 99% through indexing.
- In deployment at a throughput of 100 requests per second, decreased latency by 89% through implementing a Redis cache and by horizontally scaling by adding a load balancer and three AWS servers.

## Technologies Used

  - React
  - Node
  - Express
  - PostgreSQL
  - Redis
  - AWS
  - Artillery.io
  - Loader.io
  - New Relic

## Database Queries

Sample queries and results can be found in this GitHub Gist: [Database Queries and Results](https://gist.github.com/whitelisab/5f071178780f0752a57566a9632d0022).

## Screenshot of Legacy Front-End

I created the server endpoints and generated the database records you see rendered below.

![Screenshot](https://i.imgur.com/gklQsHR.png)

## Usage

To run this repo, you will need to install dependencies and run appropriate scripts.

## Requirements

- Node 6.13.0
- npm
- PostgreSQL

## Development

Executing the code below will install dependencies, seed the database, start the server, and start webpack. Examine the package.json file for additional scripts.

```
npm install
npm start
npm run server
npm run build
```