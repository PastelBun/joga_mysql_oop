const BaseSQLModel = require('./base')

class UserModel extends BaseSQLModel {
    constructor() {
        super('user');
    } 

    async create(user) {
        const createdUserId = await super.create(user);
        return createdUserId;
    }
    async findById(id){
        const user= await super.findById(id)
        return user
    }

    async findOneByEmail(email) {
        return await super.findOne('email', email);
    }

    async findOneByUsername(username) {
        return await super.findOne('username', username);
    }
} 

module.exports = UserModel;