const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');

router.get('/', (req, res) => articleController.getAllArticles(req, res));
router.get('/article/:slug', (req, res)=>articleController.getArticleBySlug(req,res));
router.post('/article/create', (req, res)=>articleController.createNewArticle(req,res));

module.exports = router