const authorDbModel = require('../models/author')
const authorModel = new authorDbModel()
const articleDbModel = require('../models/article')
const articleModel=new articleDbModel

class authorController{
    constructor(){
        const authors=[]
    }
    async getAuthorById(req,res){
        const author=await authorModel.findById(req.params.id)
        const articles= await articleModel.findMany(author)
        author['articles']=articles
        res.status(201).json({author: author})
    }
}

modul.exports=authorController