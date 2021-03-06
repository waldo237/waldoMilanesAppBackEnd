/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const { createWriteStream } = require('fs');
const { join } = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const RateLimit = require('express-rate-limit');
const jsonwebtoken = require('jsonwebtoken');
const { graphqlHTTP } = require('express-graphql');

const registrationRoutes = require('./src/routes/registrationRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const articleRoutes = require('./src/routes/articleRoutes');
const emailRoutes = require('./src/routes/emailRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const graphqlResolvers = require('./src/controllers/projectGraphQLResolver');
const graphqlSchema = require('./src/models/projectGraphQLSchema');

const { urlencoded, json } = express;
const app = express();

// environment variables configuration
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.disable('x-powered-by');
// mongoose connection

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
  .then(() => console.log(`connected to DataBase successfully! -- ${new Date().toLocaleString()}`))
  .catch((err) => console.log(`Could not connect to DataBase: ${err}`));

/**
 * Middlewares
 */

// throttle if exceeds 300 calls
const limiter = new RateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 300,
  message:
    { message: 'You have exceeded the maximum number of interactions from this IP address, please try again after 24 hours.' },
});
app.use(limiter);

// log only 4xx and 5xx responses to console
app.use(morgan('combined', {
  skip(req, res) { return res.statusCode < 400; },
  stream: createWriteStream(join(__dirname, 'access.log'), { flags: 'a' }),
}));

// helmet setup
app.use(helmet());

// bodyparser setup
app.use(urlencoded({
  limit: '20mb',
  parameterLimit: 100000,
  extended: true,
}));
app.use(json({ limit: '20mb' }));

// cors setup
app.use(cors({ origin: true }));

// set pug views
app.set('view engine', 'pug');

// JWT setup
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.APP_KEY, (err, decode) => {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  }),
);

// handle http routes
registrationRoutes(app);
profileRoutes(app);
projectRoutes(app);
articleRoutes(app);
emailRoutes(app);

app.get('/', (req, res) => res.render(join(__dirname, 'src/views/index'), { title: 'waldoMilanesAppBackEnd', type: 'API\'s for waldomilanes.com' }));

// handler errors
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).send({ message: 'There was an issue with your request. Please try again.' });
});

app.listen(PORT, () => console.log(`your server is running on port ${PORT} at ${new Date().toLocaleString()}`));
