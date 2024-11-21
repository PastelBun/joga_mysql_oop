const BaseSQLModel = require('./base')

class UserModel extends BaseSQLModel {
    constructor() {
        super('user')
    } 

    async create(user){
        const createdUserId=await super.create(user)
        return createdUserId
    }
    async findOne(email){
        const userEmail= await super.findOne('email', email)
        return userEmail;
    }
} 

module.exports = UserModel