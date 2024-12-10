const express = require('express');
const sessions = require('express-session');
const bodyParser = require('body-parser');
//const dotenv = require('dotenv');
const path = require("path");
//const publicDir = path.join(__dirname, './public');
const hbs=require('express-handlebars');
const app = express();
const con=require('./utils/db')
const methodOverride = require('express-method-override');
app.use(methodOverride('_method'));
const checkUser = require('./utils/userCheck');



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname:'hbs',
    defaultLayout:'main',
    layoutsDir: __dirname+'/views/layouts/'
}))
app.use(express.static('public'));
//app.use(express.static(publicDir))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.json());

app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialised: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));


con.connect(function(err){
    if(err) throw err;
    console.log("Connected to joga_mysql_oop db");
})
//dotenv.config({ path: './.env' });

app.get("/", (req, res) => {
    let query = "SELECT * FROM article";
    con.query(query, (err, result) => {
        if (err) throw err;
        let articles = result;
        res.render('index', {
            articles: articles
        });
    });
});

app.get('/article/:slug', (req,res)=> {
    let query=`SELECT * FROM article WHERE slug="${req.params.slug}"`
    con.query(query, (err, result)=>{
        let article=result
        res.render('article', {
            article:article
        })
    });
});

app.get('/login', (req, res)=>{
    res.render("login")
})
app.get('/register', (req, res)=>{
    res.render("register")
})
app.get('/create', (req, res)=>{
    res.render("create")
})
app.get('/edit/:id', (req, res) => {
    let query = `SELECT * FROM article WHERE id="${req.params.id}"`;
    con.query(query, (err, result) => {
        if (err) throw err;
        let article = result[0];
        res.render('edit', { article: article });
    });
});
app.get ('/admin/article/delete/:id', checkUser('admin'), (req, res)=>{
    let query = `DELETE FROM article WHERE id = ?`;  // Use parameterized query to avoid SQL injection
    let articleId = req.params.id;

    con.query(query, [articleId], (err, result) => {
                if (err) {
            // If an error occurs, render the 'delete' page with error message
            return res.render('delete', {
                err: 'An error occurred while deleting the article.'
            });
        }

        if (result.affectedRows > 0) {
            // If deletion was successful, render success message
            return res.render('delete', {
                success: 'Article was successfully deleted.'
            });
        } else {
            // If no rows were affected, render error message
            return res.render('delete', {
                err: 'No article found with that ID.'
            });
        }
    });
});


app.get('/admin/article/create', (req, res)=>{
    let query = `SELECT * FROM article WHERE id = ?`;
    let articleId = req.params.id;

    con.query(query, [articleId], (err, result) => {
        if (err) {
            // If an error occurs, render the 'delete' page with error message
            return res.render('result', {
                err: 'An error occurred while creating the article.'
            });
        }

        if (result.affectedRows > 0) {
            // If deletion was successful, render success message
            return res.render('result', {
                success: `Article was successfully created. With these parameters ${req.params}`
            });
        } else {
            // If no rows were affected, render error message
            return res.render('result', {
                err: 'An article with the ID of the created article seems to not exist'
            });
        }
    });
})
app.put('/admin/article/edit/:id', (req, res) => {
    // Get data from the form
    const { name, slug, image, body, author_id } = req.body;
    
    // Query to update the article in the database
    const query = `
        UPDATE article SET name = ?, slug = ?, image = ?, body = ?, author_id = ? WHERE id = ?;
    `;
    const values = [name, slug, image, body, author_id, req.params.id];  // Assuming article ID is passed as a param
    
    con.query(query, values, (err, result) => {
        if (err) throw err;
        res.redirect(`/article/${slug}`); // Redirect to the updated article page
    });
});


// Import route handlers after POST route to avoid conflicts
const authorRoutes = require('./routes/author');
const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/user');
const adminRoutes =require('./routes/admin');

app.use('/', authorRoutes);
app.use('/', articleRoutes);
app.use('/', userRoutes);
app.use('/', adminRoutes);

app.listen(3000, () => {
    console.log('App is started at http://localhost:3000');
});
