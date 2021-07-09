const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express()


const routes = require('./routes/index');
const books = require('./routes/books');

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//Static Route Setup to Public Folder
app.use('/static', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', routes);
app.use('/books', books);

//404 page not found
app.use((req,res,next) => {
    const err = new Error("Oops sorry! We cannot find the page you are searching for.");
    err.status = 404;
    next(err)
  })
  

// Error Page
app.use((err, req, res, next) => {
  res.locals.message = err; 
  res.status(err.status);
  res.render('page-not-found', {header: "Page Not Found", style: '../static/stylesheets/style.css'});
})

app.listen(3000, () => {
    console.log('This server listening on port 3000');
});

module.exports = app;