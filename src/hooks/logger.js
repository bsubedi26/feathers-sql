// A hook that logs service method before, after and error
const logger = require('winston');
const chalk = require('chalk');

module.exports = function () {
  return function (hook) {
    let message = `${hook.type}::${hook.method} [${hook.path}]`;

    if (hook.type === 'error') {
      message += `: ${hook.error.message}`;
    }

    if (hook.type === 'before') {
      console.log(chalk.yellow.bold(message));
      
    }
    if (hook.type === 'after') {
      console.log(chalk.green.bold(message));
    }

    if (hook.error) {
      console.error(chalk.red.bold(hook.error));
    }

    logger.debug('hook.data', hook.data);
    logger.debug('hook.params', hook.params);

    if (hook.result) {
      logger.debug('hook.result', hook.result);
    }

  };
};
