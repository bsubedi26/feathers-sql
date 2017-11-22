const delay = (time) => new Promise(resolve => setTimeout(resolve, time));

const debounce = () => {
  return async hook => {
    await delay(2000);
    return hook;
  };
};

module.exports = debounce;