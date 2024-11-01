const bcrypt= require('bcrypt')
const userDbModel= require('../models/user')
const userModel=new userDbModel()

class userController{

    async register(req, res){
        const cryptPassword= await bcrypt.hash(req.body.password, 10)
        const registeredId= await userModel.create({
            username:req.body.username,
            email: req.body.email,
            password: cryptPassword
        })
        
    }
}