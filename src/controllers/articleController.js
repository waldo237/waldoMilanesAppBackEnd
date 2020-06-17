const mongoose = require('mongoose')
const { articleSchema } = require('../models/articleModel');
const Article = mongoose.model('Article', articleSchema);

/**
 * @function getAllArticles fetch all the articles in the database
 */
exports.getAllArticles = async (req, res) => {
    try {
        Article.find({}, (err, articles) => {
            if (err) res.status(500).send('An  error occured while fetching the data');
            if (articles.length <= 0) res.status(500).send('An  error occured while fetching the data');
            res.json(articles);
        })
    } catch (error) {
        console.log(error)
    }
}

/**
 * @function getArticle the article specified in the id
 */
exports.getArticle = async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.id);
        await Article.findOne({ _id: id}, (err, article) => {
            if (err) throw err;
            if (!article) {
                return res.status(500).send('The article you are looking for was not found!')
            } else {
                res.json(article);
            };

        })
    }catch (error) {
        res.status(500).send('An  error occured while fetching the data');
   
    }
}

/**
 * @function postArticle allow the admin to post new articles
 */
exports.postArticle = async (req, res) => {
    const newArticle = Article(req.body);
    try {
        await newArticle.save((err, article) => {
            if (err) res.status(400).send({ message: `There was when saving the article: ${err.message}` });
            return res.json(article);
        })
    } catch (error) {
        res.send('caught error')
    }

}

/**
 * @function updateArticle allow the admin to update an existing article
 */
exports.updateArticle = async (req, res) => {
    //TODO
}

/**
 * @function deleteArticle allow the admin to delete an existing article
 */
exports.deleteArticle = async (req, res) => {
    //TODO
}