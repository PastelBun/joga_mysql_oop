const articleDbModel = require('../../models/article')
const articleModel=new articleDbModel
const articleController=require('../article');

class articleAdminController extends articleController{

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
            const id = parseInt(req.params.id); 
            console.log('Received ID:', id); 
            console.log('Request Body:', req.body);
            const updatableArticle={
                name: req.body.name,
                slug: req.body.slug, 
                image: req.body.image,
                body: req.body.body,
                published: new Date().toISOString().slice(0,19).replace('T',' '),
                author_id: req.body.author_id
            }
            
            const result = await articleModel.update(id,updatableArticle);
            res.status(201).json({
                message:`Updated article with ID: ${id}`,
                article: {id:id, ...updatableArticle}   
            }); 
        }
        async deleteArticle(req, res) {
            const id = parseInt(req.params.id); // Get ID from URL parameters
            console.log('Deleting article with ID:', id);
            
            try {
                const result = await articleModel.delete(id); // Call the delete method
                if (result > 0) {
                    res.status(200).json({
                        message: `Deleted article with ID: ${id}`,
                        article: { id: id }
                    });
                } else {
                    res.status(404).json({ message: `Article with ID ${id} not found` });
                }
            } catch (error) {
                console.error('Error deleting article:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
}

module.exports= new articleAdminController()