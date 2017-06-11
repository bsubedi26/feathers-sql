const bcrypt = require('bcryptjs');
const errors = require('feathers-errors');

function verifyUserCredentials() {
  return async (hook) => {
    console.log('verify user credentials before sending a jwt token to client...');
    const { email, password } = hook.data;
    const user = await hook.app.service('users').find({query: {email: email}}); 

    if (user[0]) {
       const passwordMatch = await bcrypt.compare(password, user[0].password)
       hook.data.passwordMatch = passwordMatch
       if (passwordMatch) {
        //if password is correct, go to the next hook (middleware)
         return hook
       } else {
        throw new errors.BadRequest('Sorry the password does not match the username.');
       }
    } else {
      throw new errors.BadRequest('Sorry that username does not exist.');
    }

  }
}

function afterCreatingToken() {
  return async (hook) => {
    
    // if (!hook.data.passwordMatch) {
    //   delete hook.result.accessToken
    //   hook.result = {
    //     error: 'Password does not match that username.'
    //   }
      
    // }

    // if (!hook.data.userFound) {
    //   hook.result = {
    //     error: 'Sorry that username does not exist.'
    //   }
      
    // }
    return hook
  }
}

module.exports = {
  verifyUserCredentials: verifyUserCredentials,
  afterCreatingtoken: afterCreatingToken
}