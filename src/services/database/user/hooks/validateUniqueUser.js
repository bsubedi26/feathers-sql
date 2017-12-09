const errors = require('@feathersjs/errors');

/*
 * If the incoming email data already exists in the database
 * return an error message to display to the client.
*/

const validateUniqueUser = () => {
  return async hook => {
    // const { message } = hook.error;

    // if (message.includes('Duplicate') && message.includes('user_email_unique')) {
    //   hook.error.message = 'The provided email already exists. Try again.';
    //   return hook;
    // }
    const { email } = hook.data;

    const user = await hook.service.find({ query: { email } });
    console.log('USER ', user);
    if (user.total > 0) {
      // const userAlreadyExists = new errors.BadRequest('Invalid Parameters', { errors: { email: 'The provided email already exists. Try again.' } });
      const userAlreadyExists = new errors.BadRequest('The provided email already exists. Try again.');
      throw userAlreadyExists;
    }

    return hook;
  };
};

module.exports = validateUniqueUser;
