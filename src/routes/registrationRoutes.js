
const { login, register, loginRequired } = require ('../controllers/userController');

const routes = (app) => {
    // registration route
    app.route('/auth/register').post(register);
    // login route
    app.route('/auth/login').post(login);
}

module.exports = routes; 