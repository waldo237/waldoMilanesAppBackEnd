const { loginRequired } = require('../controllers/userController');
const {
  updateProfile, deleteProfile, authenticateToMakeChanges, checkAccountStatus,
  retrieveProfile,
} = require('../controllers/profileController');

const routes = (app) => {
  app.route('/user/profile/:id')
    .post(loginRequired, checkAccountStatus, authenticateToMakeChanges, retrieveProfile)
    .put(loginRequired, checkAccountStatus, authenticateToMakeChanges, updateProfile)
    .delete(loginRequired, authenticateToMakeChanges, deleteProfile);
};

module.exports = routes;
