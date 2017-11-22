const hooks = require('./hooks');
const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = function(app) {
  const emailAccount = app.get('emailAccount') || {};
  // Initialize our service with any options it requires
  app.use('/private/email', Mailer(smtpTransport({
    service: 'gmail',
    auth: {
      user: emailAccount.user,
      pass: emailAccount.pass
    }
  })));

  // Now whenever we call /emails `create`
  // internally it will send an email using our gmail account.
  const emailService = app.service('/private/email');
  
  emailService.hooks(hooks);
};