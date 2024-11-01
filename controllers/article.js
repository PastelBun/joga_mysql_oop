const articleDbModel = require('../models/article')
const articleModel=new articleDbModel

class articleController {
    constructor(){
        const articles = [] 
    } 
    
    async getAllArticles(req, res) {
        const articles = await articleModel.findAll()
        res.status(201).json({articles: articles})
    }   
    async getArticleBySlug(req,res){
        const article=await articleModel.findOne(req.params.slug)
        res.status(201).json({article: article})
    }
    async createNewArticle(req,res){
        const newArticle={
            name:req.body.name,
            slug:req.body.slug,
            image:req.body.image,
            body:req.body.body,
            published:new Date().toISOString().slice(0,19).replace('T', ' '),
            author_id:req.body.author_id
        }
        const articleId=await articleModel.create(newArticle)
        res.status(201).json({
            message: `created article with ID ${articleId}`,
            article: {id:articleId, ...newArticle}
        })
    };
    async updateArticle(req,res){
        const id= parseInt(req.params.id);
        console.log('Received ID', id);
        console.log('Request Body:', req.body);
        
        const updatedArticle={
            name:req.body.name,
            slug:req.body.slug,
            image:req.body.image,
            body:req.body.body,
            published:new Date().toISOString().slice(0,19).replace('T', ' '),
            author_id:req.body.author_id
        };
        const articleId= await articleModel.update(id, updatedArticle);
        res.status(201).json({
            message: `Updated article with ID ${id}`,
            article: {id:id, ...updatedArticle}
        });
    }
    async deleteArticle(req, res) {
        const id= req.body.id;
        console.log(id);
        const articleId = await articleModel.delete(articleId);
        res.status(201).json({
            message: `Deleted article with ID ${articleId}`
        });
    }
    
} 

module.exports = new articleController()