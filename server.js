const express = require('express');
const { json, urlencoded } = require('body-parser');
const autoIncrement = require('mongoose-auto-increment');
const logger = require('morgan');
const app = express();

const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.db.url)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((err) => {
        console.error(err);
        process.exit(1); //if db is not responding
    });
mongoose.Promise = global.Promise;
autoIncrement.initialize(mongoose.connection);

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));

const api = require('./routes/api');

app.use('/api', api);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handler
app.use((err, req, res, next) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Send the error page
    res.status(err.status || 500);
    res.json(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => { //starting server
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`server is running on port ${PORT}`);
});
