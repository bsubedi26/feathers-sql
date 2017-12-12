const hooks = require('./hooks');
// const Mailer = require('feathers-mailer');
const MailerService = require('./mailer.service');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = function(app) {
  const emailAccount = app.get('mailerAccount') || {};

  const options = {
    service: 'gmail',
    auth: {
      user: emailAccount.user,
      pass: emailAccount.pass
    }
  };

  const serviceOptions = smtpTransport(options);

  // Initialize our service with any options it requires
  app.use('/private/email', MailerService(serviceOptions));

  // Now whenever we call /emails `create`
  // internally it will send an email using our gmail account.
  const emailService = app.service('/private/email');
  
  emailService.hooks(hooks);
};