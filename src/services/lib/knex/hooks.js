const debug = require('debug')('feathers-knex-transaction');

const start = () => {
  return (hook) =>
    new Promise(resolve => {
      if (!hook.service.Model || typeof hook.service.Model.transaction !== 'function') {
        return resolve(hook);
      }

      hook.service.Model.transaction(trx => {
        const id = Date.now();
        hook.params.transaction = {
          trx,
          id
        };
        debug('started a new transaction %s', id);
        return resolve(hook);
      });
    });
};

const end = () => {
  return (hook) => {
    if (hook.params.transaction) {
      const { trx, id } = hook.params.transaction;
      return trx.commit()
        .then(() => debug('finished transaction %s with success', id))
        .then(hook);
    }
    return hook;
  };
};

const rollback = () => {
  return (hook) => {
    if (hook.params.transaction) {
      const { trx, id } = hook.params.transaction;
      return trx.rollback()
        .then(() => debug('rolling back transaction %s', id))
        .then(hook);
    }
    return hook;
  };
};

module.exports = {
  transaction: {
    start,
    end,
    rollback
  }
};