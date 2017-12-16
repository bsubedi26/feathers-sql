const parseJsonForSqlite = () => {
  return async ctx =>  {
    console.log('RESULT ', ctx.result);
    // TODO: ctx.result is [] for find and {} for other methods
    if (ctx && ctx.result) {
      for (let val of ctx.result) {
        for (let key in val) {
          if (typeof val[key] === 'string' && val[key].charAt(0) === '{') {
            ctx.result[key] = JSON.parse(val[key]);
            // console.log('AFTER PARSE: ', typeof val[key]);
          }
        }

      }
    }
    return ctx;
  };
};

module.exports = parseJsonForSqlite;
