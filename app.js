//import { request } from 'https';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) =>{
    req.message = "Hello";
    //const err = new Error('Oh No!');
    //err.status = 500;
    next();
});

app.use((req, res, next) =>{
    console.log("World");
    next();
});

app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name){
        res.render('index',  { name: name });
    }else{
        res.redirect('hello');
    }
});



app.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name){
        res.redirect('/');
    }else{
        res.render('hello');
    }
});

app.get('/cards', (req, res) => {
    res.render('card', text);
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

app.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(2000);