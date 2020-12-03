const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const links = require('./lib/links');
const R = require('ramda');
const mysql = require('mysql');
const conneg = require('./lib/connegMiddleware');

const bugRepository = require('./lib/bug');
const bugsRepository = require('./lib/bugs');
const usersRepository = require('./lib/users');

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
const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql';

const connection = mysql.createConnection({
    // host        : process.env['GCP_CLOUD_SQL_HOST'],
    socketPath  : `${dbSocketPath}/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
    user        : process.env['GCP_CLOUD_SQL_USER'],
    password    : process.env['GCP_CLOUD_SQL_PWD'],
    database    : process.env['GCP_CLOUD_SQL_DB']
});

// routes
app.get('/', indexRoutes.getRoot(
    bugsRepository.getBugsPage(connection),
    usersRepository.getAllUsers(connection)));

app.get('/bugs/:pagekey', bugsRoutes.getPage(
    bugsRepository.getBugsPage(connection)));

app.post('/bugs', bugsRoutes.postBug(
    bugRepository.saveBug(connection)));

app.get('/bug/:bugid', bugRoutes.getBug(
    bugRepository.getBug(connection)));

app.put('/bug/:bugid', bugRoutes.putBug(
    bugRepository.saveBug(connection)));

module.exports = app;
