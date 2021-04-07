const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mw = require('./middleware/middleware.js');
const userRouter = require('./users/users-router.js');

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());
server.use(morgan('dev'));
server.use(helmet());
// server.use(mw.logger());


// global middlewares and the user's router need to be connected here
server.use('/api/users', mw.logger, userRouter);

server.get('/', mw.logger, (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
