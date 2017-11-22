const catchAllErrors = () => {
  return async hook => {
    const { errors } = hook.error;

    switch (errors.code) {
      case 'ER_DUP_ENTRY': {
        errors.message = 'The email already exists. Try again.'
        break;
      }
      default: {
        errors.message = 'There was a problem. Try again.'
        break;
      }
    }

    return hook;
  }
}

module.exports = catchAllErrors;
