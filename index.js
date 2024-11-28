const express = require('express');
const sessions = require('express-session');
const bodyParser = require('body-parser');
//const dotenv = require('dotenv');
const path = require("path");
//const publicDir = path.join(__dirname, './public');
const hbs=require('express-handlebars');
const app = express();
const con=require('./utils/db')


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
        console.log(articles); 
        res.render('index', {
            articles: articles
        });
    });
});

app.get('/article/:slug', (req,res)=> {
    let query=`SELECT * FROM article WHERE slug="${req.params.slug}"`
    con.query(query, (err, result)=>{
        let article=result
        console.log(article)
        res.render('article', {
            article:article
        })
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

app.listen(3001, () => {
    console.log('App is started at http://localhost:3001');
});
