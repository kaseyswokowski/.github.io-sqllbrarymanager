//main js script for the application
const express = require('express');
const path = require('path');
const sequelize = require('./models').sequelize;
const bookRoutes = require('./routes/books');
const mainRoutes = require('./routes');

//creates express app
const app = express();

//Setting some components of the app to be used.
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.use('/books', bookRoutes);
app.use('/', mainRoutes);

/* Listen on port*/
sequelize.sync().then(() => {
    //setting up dev server
    app.listen(3000, () => {
        console.log('This port is now running @ 3000.');
    });    
});

//this makes it so that any route that is not defined will pass through a defined error.
app.all('*', (req, res, next) => {
    const err = new Error('Page not found!');
    err.status = 404;
    console.log(`Something went wrong. Status: ${err.status}, Message: ${err.message}, Stack: ${err.stack}`)
    next(err);
});

// error handler
app.use( (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    console.log(err.message, err.status);

    // render the error page
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render('page-not-found');
    } else {
        res.render('error');
    }
});