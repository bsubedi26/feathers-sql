const user = require('./user/user.service.js');
const task = require('./task/task.service.js');
const message = require('./message/message.service.js');
// const blog = require('./blog/blog.service.js');
// const comment = require('./comment/comment.service.js');

const routesTable = require('./routesTable');

module.exports = function (app) {
  app.configure(user);
  app.configure(task);
  app.configure(message);
  // app.configure(blog);
  // app.configure(comment);

  app.configure(routesTable);
};
