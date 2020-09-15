const mongoose = require('mongoose');
const { articleSchema } = require('../models/articleModel');
const { UserSchema } = require('../models/userModel');

const Article = mongoose.model('Article', articleSchema);
const User = mongoose.model('User', UserSchema);

/**
 * @function getAllArticles fetch all the articles in the database
 */
exports.getAllArticles = (req, res) => {
  try {
    Article.find({}, (err, articles) => {
      if (err) res.status(500).send('An  error occured while fetching the data');
      if (articles && articles.length <= 0) return res.status(500).send('An  error occured while fetching the data');
      return res.json(articles);
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @function getArticle the article specified in the id
 */
exports.getArticle = (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Article.findOne({ _id: id }, (err, article) => {
      if (err) throw err;
      if (!article) {
        return res.status(500).send('The article you are looking for was not found!');
      }
      return res.json(article);
    });
  } catch (error) {
    res.status(500).send('An  error occured while fetching the data');
  }
};

/**
 * @function postArticle allow the admin to post new articles
 */
exports.postArticle = (req, res) => {
  try {
    const newArticle = Article(req.body);
    newArticle.save((err, article) => {
      if (err) res.status(400).send({ message: `There was when saving the article: ${err.message}` });
      return res.json(article);
    });
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};

/**
 * @function updateArticle allow the admin to update an existing article
 */
exports.updateArticle = (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Article.updateOne({ _id: id }, req.body, { runValidators: true, new: true }, (err, article) => {
      if (err) res.send(err.message);

      return (article.nModified) ? res.json('The article was modified correctly.') : res.status(404).send('The update did not take effect.');
    });
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};

/**
 * @function deleteArticle allow the admin to delete an existing article
 */
exports.deleteArticle = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Article.deleteOne({ _id: id }, (err, query) => {
      if (err) throw err;
      return (query.n)
        ? res.status(200).send(`${query.n} was deleted.`)
        : res.status(404).send('An error occured while trying to delete item.');
    });
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};

/**
 * @function postArticleRating post a like or diske on an arcle.
 * fetch the _id from the body.
 * find an article by id. Push a rating(like|dislike). Send a notification.
 */
exports.postArticleRating = (req, res) => {
  try {
    const { id, rating } = req.body;
    Article.updateOne({ _id: id }, { $push: { rating } },
      { runValidators: true }, (err, article) => {
        if (err) throw err;
        return res.json(article);
      });
  } catch (error) {
    res.status(500).send(`caught error: ${error.message}`);
  }
};

/**
 * @function postArticleComment post a comment on an arcle.
 * fetch the _id from the body.
 * find an article by id. Push a comment. Send confirmation to the user.
 */
exports.postArticleComment = (req, res, next) => {
  try {
    const { id, comment, userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(401)
        .send({ message: 'Issue with credential. please log in.' });
    }
    User.findOne({ _id: userId }, (error, user) => {
      if (error) throw error;
      if (!user) return res.status(401).send({ message: "you can't send comment with these credentials. please log in." });

      return Article.updateOne({ _id: id }, {
        $push: {
          comments: {
            comment,
            userId,
          },
        },
      },
      { runValidators: true }, (err, article) => {
        if (err)next(err.message);
        return res.json(article);
      });
    });
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};

/**
 * @function updateArticleComment find an article by id,
 * query a comment made by user_id, make the update, send notification.
 */
exports.updateArticleComment = (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Article.updateOne({ _id: id }, req.body, { runValidators: true, new: true }, (err, article) => {
      if (err) res.send(err.message);

      return (article.nModified) ? res.json('The article was modified correctly.') : res.status(404).send('The update did not take effect.');
    });
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};

/**
 * @function updateArticleComment delete a comment on an article.
 * find an article by id,
 * query a comment made by user_id, delete the comment, send notification.
 */
exports.deleteArticleComment = async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Article.deleteOne({ _id: id }, (err, query) => {
      if (err) throw err;
      return (query.n)
        ? res.status(200).send(`${query.n} was deleted.`)
        : res.status(404).send('An error occured while trying to delete item.');
    });
  } catch (error) {
    res.status(500).send(`caught error: ${error}`);
  }
};
