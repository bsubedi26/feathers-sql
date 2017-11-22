const assert = require('assert');
const app = require('../../src/app');

describe('\'check\' service', () => {
  it('registered the service', () => {
    const service = app.service('check');

    assert.ok(service, 'Registered the service');
  });
});
