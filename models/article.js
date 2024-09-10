const BaseSQLModel = require('./base')

class ArticleModel extends BaseSQLModel {
    constructor() {
        super('article')
    } 

    async findAll() {
        const articles = await super.findAll()
        return articles;
    } 
    async findOne(slug){
        const article= await super.findOne('slug', slug)
        return article;
    }
    async findMany(author) {
        const articles = await super.findMany('author_id', author.id);
        return articles;

    }
    async create(article){
        const createdArticleId=await super.create(article)
        return createdArticleId
    }
    async update(article, id){
        const updatedArticleId=await super.update(article, id)
        return updatedArticleId;
        
    }
    async delete(id){
        const deleteArticleId=await super.delete(id)
        return deleteArticleId;
    }
} 

module.exports = ArticleModel