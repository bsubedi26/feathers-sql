const lodash = require('lodash');
const faker = require('faker');

module.exports = function (app) {

  const userData = [
    { email: 'Dave', password: 'passpass' },
    { email: 'admin@feathersjs.com', password: 'secret' },
    { email: 'user@feathersjs.com', password: 'secret'}
  ]

  async function seed(name, data) {
    // console.log(data.length + ' ' + name);
    const service = app.service(name);
    // console.log(service)
    await service.Model.remove({});
    return service.create(data);
  }


  async function main() {
    // const users = await seed('users', userData)
    const users = await seed('users', userData)
    const tasks = await seed('tasks', lodash.times(25, () => {
      return {
        completed: lodash.shuffle([true, false])[0],
        owner: lodash.shuffle(users)[0],
        text: lodash.capitalize(faker.lorem.words(lodash.random(3, 7))),
      }
    }))

    console.log('SEED DONE.')
    // process.exit();
  }
  main()

}
