const { loginRequired } = require('../controllers/userController');
const {
  getAllArticles, getArticle, postArticle, updateArticle, deleteArticle,
  postArticleRating, postArticleComment, updateArticleComment, deleteArticleComment,
  getArticleComments,
  getArticleRating,
} = require('../controllers/articleController');
const { likesAndDislikesLimit } = require('./likesAndDislikesLimit');

const routes = (app) => {
  // registration route
  app.route('/articles')
    .get(getAllArticles)
    .post(loginRequired, postArticle);

  app.route('/article/:id')
    .get(getArticle)
    .put(loginRequired, updateArticle)
    .delete(loginRequired, deleteArticle);

  app.route('/article/rating/:id')
    .get(getArticleRating);

  app.route('/article/rating/:articleId')
    .post(likesAndDislikesLimit, postArticleRating);

  app.route('/article/comment')
    .post(loginRequired, postArticleComment);

  app.route('/article/comment/:id')
    .get(getArticleComments)
    .put(loginRequired, updateArticleComment)
    .delete(loginRequired, deleteArticleComment);
};

module.exports = routes;
