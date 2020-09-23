const rateLimit = require('express-rate-limit');
const { loginRequired } = require('../controllers/userController');
const {
  getAllArticles, getArticle, postArticle, updateArticle, deleteArticle,
  postArticleRating, postArticleComment, updateArticleComment, deleteArticleComment,
} = require('../controllers/articleController');

const likesAndDislikesLimit = rateLimit({
  windowMs: 168 * 60 * 60 * 1000, // 1 hour window
  max: 2, // start blocking after 5 requests
  message:
    { message: 'Too many actions of this type from this IP address, please try again after 24 hours.' },
});

const routes = (app) => {
  // registration route
  app.route('/articles')
    .get(getAllArticles)
    .post(loginRequired, postArticle);

  app.route('/article/:id')
    .get(getArticle)
    .put(loginRequired, updateArticle)
    .delete(loginRequired, deleteArticle);

  app.route('/article/rating')
    .post(likesAndDislikesLimit, postArticleRating);

  app.route('/article/comment')
    .post(loginRequired, postArticleComment);

  app.route('/article/comment/:id')
    .put(loginRequired, updateArticleComment)
    .delete(loginRequired, deleteArticleComment);
};

module.exports = routes;
