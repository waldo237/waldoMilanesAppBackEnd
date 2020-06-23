
const {loginRequired } = require ('../controllers/userController');
const { getAllArticles, getArticle, postArticle, updateArticle, deleteArticle } = require ('../controllers/articleController');

const routes = (app) => {
    // registration route
    app.route('/articles')
    .get( getAllArticles)
    .post(loginRequired, postArticle);
   
    app.route('/article/:id')
        .get(loginRequired, getArticle)
        .put(loginRequired, updateArticle)
        .delete(loginRequired, deleteArticle);

}

module.exports = routes; 