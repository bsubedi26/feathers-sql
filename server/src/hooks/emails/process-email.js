const errors = require('feathers-errors');

module.exports = function () {
  return async function (hook) {
    const { toEmail } = hook.data
    const { user } = hook.params;
    const userService = hook.app.service('users')
    
    // console.log('user ', user)
    // console.log('params ', hook.params)

    const doc = await userService.find({ query: { email: toEmail } })
    if (doc[0]) {

      console.log('toEmail found: ', doc)
      const toUserId = doc[0]._id;

      hook.data = Object.assign({}, hook.data, {
        fromUserId: user._id,
        toUserId: doc[0]._id
      })
      // console.log('data ', hook.data)
      return hook;

    } else {
      throw new errors.NotFound('The user you are trying to send the email to does not exist');
    }

  }

}