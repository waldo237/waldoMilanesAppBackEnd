const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const registrationRoutes = require('./src/routes/registrationRoutes');
const projectRoutes = require('./src/routes/projectRoutes');
const articleRoutes = require('./src/routes/articleRoutes');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;


// environment variables configuration
dotenv.config();

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
 * Middleware
 */
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


app.get('/', (req, res) =>
    res.send(`waldoMilanesAppBackEnd futureDocumentation.html`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);

