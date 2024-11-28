const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');
const checkUser = require('../utils/userCheck');

router.post('/admin/article/create', checkUser('admin'), (req, res)=>articleController.createNewArticle(req,res));
router.put('/admin/article/edit/:id', checkUser('admin'), (req,res)=> articleController.updateArticle(req,res));
router.delete('/admin/article/delete/:id', checkUser('admin'), (req, res) => articleController.deleteArticle(req, res));


module.exports = router