module.exports = {
  getRandomProductIdFirst: (context, events, done) => {
    context.vars.id = Math.floor(Math.random() * (100000));
    return done();
  },

  getRandomProductIdMid: (context, events, done) => {
    context.vars.id = Math.floor(Math.random() * (550000 - 450000)) + 450000;
    return done();
  },

  getRandomProductIdLast: (context, events, done) => {
    context.vars.id = Math.floor(Math.random() * (1000000 - 900000)) + 900000;
    return done();
  },
};
