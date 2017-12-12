const accountService = require('../../../../private/auth-management/notifier');

// AFTER USER IS CREATED SEND VERIFICATION EMAIL
const sendVerificationEmail = () => {
  return async hook => {
    if (!hook.params.provider) return hook;

    const user = hook.result;

    if (hook.data && hook.data.email && user) {
      accountService(hook.app).notifier('resendVerifySignup', user);
      return hook;
    }
    return hook;
  };
};

module.exports = sendVerificationEmail;
