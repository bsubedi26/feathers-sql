const path = require('path');

const uiIndex = path.resolve(__dirname, '../public/docs.html');
// const distPath = path.resolve(__dirname, '../node_modules/swagger-ui-dist');
// const uiIndex = path.resolve(distPath, 'index.html');

exports.swaggerOptions = {
    'swagger': '3.0',
    docsPath: '/docs',
    uiIndex,
    'info': {
        'description': 'This is a API server swagger portal. To find out more about Swagger [http://swagger.io](http://swagger.io) or on [irc.freenode.net, #swagger](http://swagger.io/irc/). You can use the api key `special-key` to test the authorization filters.',
        'version': '1.0.0',
        'title': 'FeathersSQL',
        'termsOfService': 'http://swagger.io/terms/',
        'contact': {
            'email': 'contact@feathers.com'
        },
        'license': {
            'name': 'MIT',
            'url': 'http://www.apache.org/licenses/LICENSE-2.0.html'
        }
    }

};
