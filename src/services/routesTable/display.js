const chalk = require('chalk');
/**
 * Display ALL routes table with different colors
 * Displays route method & path when server first initializes
 * @param {app} 
*/

module.exports = function(app) {
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      r.route.methods.hasOwnProperty('get') ? console.log(chalk.blue('GET'), chalk.green(`${r.route.path}`)) : null;
      r.route.methods.hasOwnProperty('post') ? console.log(chalk.yellow('POST'), chalk.green(`${r.route.path}`)) : null;
      r.route.methods.hasOwnProperty('put') ? console.log(chalk.white('PUT'), chalk.green(`${r.route.path}`)) : null;
      r.route.methods.hasOwnProperty('patch') ? console.log(chalk.magenta('PATCH'), chalk.green(`${r.route.path}`)) : null;
      r.route.methods.hasOwnProperty('delete') ? console.log(chalk.red('DEL'), chalk.green(`${r.route.path}`)) : null;
      console.log(chalk.white('-------------------------------------------------------------'));
    }

  });
};