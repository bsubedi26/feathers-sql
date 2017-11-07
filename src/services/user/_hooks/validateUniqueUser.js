/*
 * If an error is thrown during user - create where
 * the incoming email data already exists in the database
 * return a message to display to the user.
*/

const validateUniqueUser = () => {
  return async hook => {
    const { message } = hook.error

    if (message.includes('Duplicate') && message.includes('user_email_unique')) {
      hook.error.message = 'The provided email already exists. Try again.'
      return hook
    }

    return hook
  }
}

module.exports = validateUniqueUser;
