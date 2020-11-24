const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const links = require('./lib/links');
const R = require('ramda');
const mysql = require('mysql');
const conneg = require('./lib/connegMiddleware');

const indexRoutes = require('./routes/index');
const bugsRoutes = require('./routes/bugs');
const bugRoutes = require('./routes/bug');

const app = express();

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(conneg.contentTypeExtensions);
app.use(conneg.negotiate);


app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', process.env['CORS_ALLOW_ORIGIN']);
    res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// application configuration objects
const connection = mysql.createConnection({
    host     : process.env['GCP_CLOUD_SQL_HOST'],
    user     : process.env['GCP_CLOUD_SQL_USER'],
    password : process.env['GCP_CLOUD_SQL_PWD'],
    database : process.env['GCP_CLOUD_SQL_DB']
});

// routes
app.get('/', indexRoutes.getRoot(connection));
app.get('/bugs/:pagekey', bugsRoutes.getPage(connection));
app.post('/bugs', bugsRoutes.postBug(connection));
app.get('/bug/:bugid', bugRoutes.getBug(connection));
app.put('/bug/:bugid', bugRoutes.putBug(connection));

module.exports = app;
