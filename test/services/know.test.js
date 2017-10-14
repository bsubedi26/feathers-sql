const assert = require('assert');
const app = require('../../src/app');

describe('\'know\' service', () => {
  it('registered the service', () => {
    const service = app.service('know');

    assert.ok(service, 'Registered the service');
  });
});
