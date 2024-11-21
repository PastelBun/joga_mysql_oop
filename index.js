const express = require('express')
const sessions= require('express-session')
const bodyParser=require('body-parser')
const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialised: true,
    cookie: {maxAge: 1000*60*60*24},
    resave: false
}));

const authorRoutes= require('./routes/author');
const articleRoutes = require('./routes/article');
const userRoutes= require('./routes/user');
app.use('/', authorRoutes); 
app.use('/', articleRoutes);
app.use('/', userRoutes);

app.listen(3025, () => {
    console.log('App is started at http://localhost:3025')
})