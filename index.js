const express = require('express');
const sessions = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv');
const path = require("path");
const publicDir = path.join(__dirname, './public');
const bcrypt = require("bcryptjs");

app.use(express.static(publicDir))
app.set('view engine', 'hbs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: 'false' }));
app.use(express.json());

app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialised: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));

dotenv.config({ path: './.env' });

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login");
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

app.listen(3025, () => {
    console.log('App is started at http://localhost:3025');
});
