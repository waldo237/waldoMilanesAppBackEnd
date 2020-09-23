/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const { articleSchema } = require('../models/articleModel');
const { UserSchema } = require('../models/userModel');

const Article = mongoose.model('Article', articleSchema);
const User = mongoose.model('User', UserSchema);

/**
 * @function getAllArticles fetch all the articles in the database
 */
exports.getAllArticles = (req, res, next) => {
  try {
    Article.find({}, (err, articles) => {
      if (err) throw new Error('An  error occured while fetching the data');
      if (!articles) return res.status(404).send('The data was not found.');
      return res.status(200).json(articles);
    });
  } catch (error) {
    next(error.message);
  }
};

/**
 * @function getArticle the article specified in the id
 */
exports.getArticle = (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Article.findOne({ _id: id }, (err, article) => {
      if (err) throw err;
      if (!article) {
        return res.status(404).json({ message: 'The article you are looking for was not found!' });
      }
      return res.json(article);
    });
  } catch (error) {
    next(error.message);
  }
};

/**
 * @function postArticle allow the admin to post new articles
 */
exports.postArticle = (req, res, next) => {
  try {
    const newArticle = Article(req.body);
    newArticle.save((err, article) => {
      if (err) throw err;
      return res.json(article);
    });
  } catch (error) {
    next(error.message);
  }
};

/**
 * @function updateArticle allow the admin to update an existing article
 */
exports.updateArticle = (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Article.updateOne({ _id: id }, req.body, { runValidators: true, new: true }, (err, article) => {
      if (err) throw err;

      if (!article) return res.status(404).send('Article not found.');
      return (article.nModified) ? res.json('The article was modified correctly.') : res.status(404).send('The update did not take effect.');
    });
  } catch (error) {
    next(error.message);
  }
};

/**
 * @function deleteArticle allow the admin to delete an existing article
 */
exports.deleteArticle = (req, res, next) => {
  try {
    const id = mongoose.Types.ObjectId(req.params.id);
    Article.deleteOne({ _id: id }, (err, query) => {
      if (err) throw err;
      return (query.n)
        ? res.status(200).send(`${query.n} was deleted.`)
        : res.status(401).send('An error occured while trying to delete item.');
    });
  } catch (error) {
    next(error.message);
  }
};

/**
 * @function postArticleRating post a like or diske on an arcle.
 * fetch the _id from the body.
 * find an article by id. Push a rating(like|dislike). Send a notification.
 */
exports.postArticleRating = (req, res, next) => {
  try {
    const { id, rating } = req.body;
    Article.updateOne({ _id: id }, { $push: { rating } },
      { runValidators: true }, (err, article) => {
        if (err) throw err;
        if (!article) return res.status(404).send('Article not found.');
        return (article.nModified)
          ? res.json({ message: 'Thanks for your feedback.' })
          : res.status(401).send('Something went wrong, we could not get your feedback.');
      });
  } catch (error) {
    next(error.message);
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
    const { isValid } = mongoose.Types.ObjectId;
    if (!isValid(userId) || !isValid(id)) {
      return res.status(401).send({ message: 'Issue with request, please check and try again.' });
    }
    User.findOne({ _id: userId }, (error, user) => {
      if (error) return next(error);
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
        if (err) return next(err);
        if (!article) return res.status(404).send('Article not found.');
        return (article.nModified)
          ? res.status(200).json({ message: 'The comment was added successfully.' })
          : res.status(401).json({ message: 'The comment was not added. Please try again.' });
      });
    });
  } catch (error) {
    next(error.message);
  }
};

/**
 * @function updateArticleComment find an article by id,
 * query a comment made by user_id, make the update, send notification.
 */
exports.updateArticleComment = (req, res, next) => {
  try {
    const { comment, userId, commentId } = req.body;
    const { isValid } = mongoose.Types.ObjectId;
    if (!isValid(userId) || !isValid(commentId)) {
      return res.status(401).send({ message: 'Issue with request, please check and try again.' });
    }

    User.findOne({ _id: userId }, (error, user) => {
      if (error) throw error;
      if (!user) return res.status(401).json({ message: "you can't send comment with these credentials. please log in." });

      return Article.updateOne({ 'comments._id': commentId }, {
        $set: { 'comments.$.comment': comment },
      },
      { runValidators: true }, (err, article) => {
        if (err) throw err;
        if (!article) return res.status(404).send('Article not found.');
        return (article.nModified)
          ? res.status(200).json({ message: 'The the comment was updated correctly.' })
          : res.status(401).json({ message: 'The update did not take effect.' });
      });
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @function deleteArticleComment delete a comment on an article.
 * find an article by id,
 * query a comment made by user_id, delete the comment, send notification.
 */
exports.deleteArticleComment = async (req, res, next) => {
  try {
    const { id, userId, commentId } = req.body;
    const { isValid } = mongoose.Types.ObjectId;
    if (!isValid(userId) || !isValid(commentId) || !isValid(id)) {
      return res.status(401).send({ message: 'Issue with request, please check and try again.' });
    }

    User.findOne({ _id: userId }, (error, user) => {
      if (error) throw error;
      if (!user) return res.status(401).json({ message: "you can't send comment with these credentials. please log in." });

      return Article.updateOne({ _id: id },
        { $pull: { comments: { _id: commentId, userId } } },
        { runValidators: true, new: true }, (err, article) => {
          if (err) throw err;

          if (!article) return res.status(404).send('Article not found.');
          return (article.nModified)
            ? res.status(200).json({ message: 'The the comment was deleted correctly.' })
            : res.status(401).json({ message: 'The removal did not take effect.' });
        });
    });
  } catch (error) {
    next(error);
  }
};
