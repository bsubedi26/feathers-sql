const assert = require('assert');
const app = require('../../src/app');

describe('\'monn\' service', () => {
  it('registered the service', () => {
    const service = app.service('monn');

    assert.ok(service, 'Registered the service');
  });
});
