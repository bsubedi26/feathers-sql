// const validator = require('is-my-json-valid')
const errors = require('feathers-errors')

// validations that the incoming data (req.body) has the appropriate properties
function bodyValidation() {
  return function (hook) {
    // let result = validateJSON(hook.data, {}) 
    console.log(hook.data.password)
    // hook.app.service('users')
    if (!typeof hook.data.password === 'string') {
      console.log('none DATA ', hook.data)
    }
    console.log('::afterCreateUser() ', hook.data)
    return hook
  }
}

// function isJsonValid(schema, options) {
//   options = Object.assign({
//     verbose: true,
//     greedy: true
//   }, options)

//   return (hook) => {
//     var validate = validator(schema, options)
//     var valid = validate(hook.data)

//     console.log('VALiD', valid)
//     if (!valid) {
//       let data = hook.data
//       data.errors = validate.errors.map(errorsMap)
//       throw new errors.BadRequest('Validation failed', data)
//     }
//   }
// }

// function errorsMap(error) {
//   error.path = error.field.replace(/^data\./, '')
//   delete error.field
//   return error
// }




module.exports = {
  bodyValidation: bodyValidation,
  // isJsonValid: isJsonValid
}