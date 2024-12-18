const articleDbModel = require('../../models/article')
const articleModel=new articleDbModel
const articleController=require('../article');

class articleAdminController extends articleController{
    //currently still crashes server if same slug is used
    async createNewArticle(req, res) {
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace('T', ' '),  // Set the publication date
            author_id: req.body.author_id  // Assuming you have an author ID from the form
        };
    
        try {
            // Check if the slug already exists in the article table
            const slugCheck = await articleModel.findSlug(newArticle.slug);  // Use newArticle.slug
    
            console.log('Slug check result:', slugCheck);  // Log the result for debugging
    
            // If the slug exists, return an error message
            if (slugCheck ) {
                return res.render('create', { message: 'Slug already in use' });
            }
            // If the slug doesn't exist, proceed to create the new article
            const articleId = await articleModel.create(newArticle);
    
            // Send a JSON response confirming article creation
            res.status(201).json({
                message: `Created article with ID ${articleId}`,
                article: { id: articleId, ...newArticle }
            });
            
            // Optionally, redirect to another page after article creation (like a dashboard or article list)
            // res.redirect('/admin/articles');
    
        } catch (err) {
            console.error(err);  // Log any errors for debugging
            res.status(500).json({ message: 'Error occurred while creating the article' });
        }
    };
    
    async findSlug(req,res){
        const article=await articleModel.findOne(req.params.slug)
        res.status(201).json({article: article})
    }
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
            console.log(result)
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