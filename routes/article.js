const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');

router.get('/article', (req, res) => articleController.getAllArticles(req, res));
router.get('/article/:slug', (req, res)=>articleController.getArticleBySlug(req,res));
router.get('/article/create', (req, res) => {
    res.render('form');
});
router.post('/create', articleController.createNewArticle);


module.exports = router