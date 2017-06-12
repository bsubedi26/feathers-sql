const { Verifier } = require('feathers-authentication-jwt');

class CustomVerifier extends Verifier {
  // The verify function has the exact same inputs and 
  // return values as a vanilla passport strategy
  verify(req, payload, done) {
    // do your custom stuff. You can call internal Verifier methods
    // and reference this.app and this.options. This method must be implemented.
    console.log('JWT CustomVerifier verify()')
    done(null, payload);
  }
}

module.exports = CustomVerifier;