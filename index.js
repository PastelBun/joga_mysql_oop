const express = require('express')
const bodyParser=require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

const articleRoutes = require('./routes/articles')
app.use('/', articleRoutes)

app.listen(3025, () => {
    console.log('App is started at http://localhost:3025')
})