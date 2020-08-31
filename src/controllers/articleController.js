const mongoose = require('mongoose');
const { articleSchema } = require('../models/articleModel');

const Article = mongoose.model('Article', articleSchema);

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
