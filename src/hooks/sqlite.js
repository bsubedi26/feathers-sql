const { BadRequest } = require('feathers-errors');

exports.sqliteErrorHandler = function() {
  return async (hook) => {
    const { error } = hook;
    (error.message.indexOf('ER_DUP_ENTRY') > 0) ? new BadRequest('The provided email already exists.') : null;

    // switch (error.errno) {
    //     // DUPLICATE NAME VIOLATION 
    //     case 19: {
    //         console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    //         console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    //         console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    //         console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
    //         throw new BadRequest(error);
    //     }

    //     default: {
    //         throw new BadRequest(error);
    //     }
    // }

    return hook;
  };
};

exports.displayResponse = function() {
  return async (hook) => {
    return hook;
  };
};