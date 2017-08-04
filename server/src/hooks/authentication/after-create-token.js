module.exports = function () {
  return function(hook) {
    delete hook.params.user.password;
    delete hook.params.user.avatar;
    delete hook.params.user.createdAt;
    delete hook.params.user.updatedAt;
    delete hook.params.user.__v;
    hook.result = Object.assign({}, hook.result, {
      user: hook.params.user
    });
    return Promise.resolve(hook);
  }
}