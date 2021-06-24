const { loginRequired } = require('../controllers/userController');
const {
  getAllProjects, getProjectsByTechnology, getProject,
  postProject, updateProject, deleteProject, postProjectRating,
  postProjectComment, updateProjectComment, deleteProjectComment,
  getProjectComments, getProjectRating,
} = require('../controllers/projectController');
const { likesAndDislikesLimit } = require('./likesAndDislikesLimit');

const routes = (app) => {
  // project routes
  app.route('/projects')
    .get(getAllProjects)
    .post(loginRequired, postProject);

  app.route('/projects/:technology')
    .get(getProjectsByTechnology)
    .post(loginRequired, postProject);

  app.route('/project/:id')
    .get(loginRequired, getProject)
    .put(loginRequired, updateProject)
    .delete(loginRequired, deleteProject);

  app.route('/project/rating/:id')
    .get(getProjectRating);

  app.route('/project/rating/:projectId')
    .post(likesAndDislikesLimit, postProjectRating);

  app.route('/project/comment')
    .post(loginRequired, postProjectComment);

  app.route('/project/comment/:id')
    .get(getProjectComments)
    .put(loginRequired, updateProjectComment)
    .delete(loginRequired, deleteProjectComment);
};

module.exports = routes;
