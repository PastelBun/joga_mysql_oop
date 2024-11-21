const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');  // importing the instance

router.post('/user/register', (req, res) => userController.register(req, res));
router.post('/user/login', (req, res) => userController.login(req, res));

module.exports = router;
