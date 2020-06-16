const mongoose = require('mongoose')
const {articleSchema} = require('../models/articleModel');
const Article = mongoose.model('Article', articleSchema);

/**
 * @function getAllArticles fetch all the articles in the database
 */
exports.getAllArticles = async (req, res) => {
    //TODO return all articles in the db
}

/**
 * @function getArticle the article specified in the id
 */
exports.getArticle = async (req, res) => {
    //TODO return the article specified in the id
}

/**
 * @function postArticle allow the admin to post new articles
 */
exports.postArticle = async (req, res) => {
   const newArticle = Article(req.body);
   try {
    await newArticle.save((err, article)=>{
        if(err){
         return res.status(400).send({ message: `There was when saving the article: ${err}` });
        }
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