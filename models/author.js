const BaseSQLModel = require('./base')

class AuthorModel extends BaseSQLModel {
    constructor() {
        super('author')
    } 

    async findMany() {
        const articles = await super.findMany()
        return articles
    } 
    
} 

module.exports = AuthorModel