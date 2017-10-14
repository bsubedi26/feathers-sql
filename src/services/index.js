const messages = require('./messages/messages.service.js');
const users = require('./users');
const blog = require('./blog/blog.service.js');
const configureRoutesTable = require('./util')
const comment = require('./comment');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(messages);
  app.configure(users);
  app.configure(blog);
  app.configure(comment);
  // configureRoutesTable(app)
};
