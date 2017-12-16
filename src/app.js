const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const rest = require('@feathersjs/express/rest');
const socketio = require('@feathersjs/socketio');

const handler = require('@feathersjs/errors/handler');
const notFound = require('@feathersjs/errors/not-found');
const { profiler }  = require('feathers-profiler');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const knex = require('./knex');
const authentication = require('./authentication');

const app = express(feathers());

// Load app/express configuration
app.configure(configuration())
    .use(cors())
    .use(helmet())
    .use(compress())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(favicon(path.join(app.get('public'), 'favicon.ico')))
    .use('/', express.static(app.get('public')));


// Load Feathers Core
app.configure(rest())
    .configure(socketio())
    .configure(knex)
    .configure(middleware)
    .configure(channels)
    .configure(authentication)
    .configure(services)
    .configure(profiler({ stats: 'detail' })); // must be configured after all services


// Load Final handlers
app.use(notFound())
    .use(handler());

//Load Top Level App hooks that run for every service
app.hooks(appHooks);

module.exports = app;
