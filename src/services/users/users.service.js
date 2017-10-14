const { Service } = require('feathers-knex');

class UserService extends Service {
  constructor(opts) {
    super(opts)
  }

  async findByEmail (email) {
    const users = await this.knex('users').where({ email: email })
    return Promise.resolve(users)
  }

  setup (app, path) {

  }

}

module.exports = UserService;
