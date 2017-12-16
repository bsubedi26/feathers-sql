// const { authenticate } = require('@feathersjs/authentication').hooks;
// const { populate } = require('feathers-hooks-common');
const stringifyJSON = () => async ctx => {
  console.log('after ', randomlyGeneratedText());


  // for (let i = 0; i < 20; i++) {
  await ctx.service.create({ comment: randomlyGeneratedText(), area: { works: true } });
  // }
  
  // ctx.data.area = JSON.stringify(ctx.data.area);
  return ctx;
};


function randomlyGeneratedText() {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';
  for (let i = 0; i < 12; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));   
  }
  return text;
}

module.exports = {
  before: {
    all: [
    ],
    find: [

    ],
    get: [],
    create: [
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [
    ],
    find: [
    ],
    get: [],
    create: [
      // stringifyJSON()
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
