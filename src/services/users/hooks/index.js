const { BadRequest } = require('feathers-errors');

exports.validateUniqueUser = function() {
  return async (hook) => {
    const { email } = hook.data
    const userFound = await hook.service.findByEmail(email)
    console.log('userFound? ', userFound)
    if (userFound.length > 0) {
      throw new BadRequest('Invalid Credentials: The provided email address already exists.')
    }
    
    return hook
  }
}