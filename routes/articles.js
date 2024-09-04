const express = require('express')
const router = express.Router()
const articleController = require('../controllers/article')

router.get('/', (req, res) => articleController.getAllArticles(req, res))

module.exports = router