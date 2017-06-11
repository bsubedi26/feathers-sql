const assert = require('assert');
const app = require('../../src/app');

describe('\'users2\' service', () => {
  it('registered the service', () => {
    const service = app.service('users-2');

    assert.ok(service, 'Registered the service');
  });
});
