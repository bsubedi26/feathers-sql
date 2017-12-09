const isAction = (...args) => {
  // let args = Array.from(arguments);
  return hook => args.includes(hook.data.action);
};

module.exports = isAction;
