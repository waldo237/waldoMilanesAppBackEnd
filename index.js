const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const jsonwebtoken = require('jsonwebtoken');
const registrationRoutes = require('./src/routes/registrationRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const articleRoutes = require('./src/routes/articleRoutes');
const emailRoutes = require('./src/routes/emailRoutes');
const {createWriteStream} = require('fs')
const {join} = require('path');
const PORT = process.env.PORT || 3001;


// environment variables configuration
dotenv.config();
app.disable('x-powered-by');  
// mongoose connection
try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log(`connected to DataBase successfully! at ${Date(Date.now().toString())}`))
        .catch(err => console.log(`Could not connect to DataBase: ${err}`));
} catch (error) {
    console.log(error)
}

/**
 * Middlewares
 */

// throttle if exceeds 300 calls 
const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    delayMs: 0
});
app.use(limiter)
// log only 4xx and 5xx responses to console
app.use(morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 },
    stream: createWriteStream(join(__dirname, 'access.log'), { flags: 'a' }),
  }));

// helmet setup
app.use(helmet());
// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// cors setup
app.use(cors({ origin: '*' }));

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

// handle http routes
registrationRoutes(app);
projectRoutes(app);
articleRoutes(app);
emailRoutes(app);
app.get('/', (req, res) =>
    res.send(`waldoMilanesAppBackEnd futureDocumentation.html`)
);


app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);

