const articleDbModel = require('../models/article')
const articleModel = new articleDbModel()

class articleController {
    constructor(){
        const articles = [] 
    } 
    
    async getAllArticles(req, res) {
        this.articles = await articleModel.findAll()
        res.status(201).json({articles: this.articles})
    }   
} 

module.exports = new articleController()