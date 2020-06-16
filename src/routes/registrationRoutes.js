
const { login, register, loginRequired } = require ('../controllers/userController');

const routes = (app) => {
    // registration route
    app.route('/auth/register')
        .post(register);

}

module.exports = routes; 