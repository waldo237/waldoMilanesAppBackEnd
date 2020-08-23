const { loginRequired } = require('../controllers/userController');
const {
  updateProfile, deleteProfile, authenticateToMakeChanges, checkAccountStatus,
} = require('../controllers/profileController');

const routes = (app) => {
  app.route('/user/profile/:id')
    .put(loginRequired, checkAccountStatus, authenticateToMakeChanges, updateProfile)
    .delete(loginRequired, authenticateToMakeChanges, deleteProfile);
};

module.exports = routes;
