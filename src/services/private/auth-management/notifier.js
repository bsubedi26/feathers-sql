const path = require('path');
const pug = require('pug');

const isProd = process.env.NODE_ENV === 'production';

module.exports = function(app) {

  const returnEmail = app.get('mailerAccount').user || process.env.COMPLAINT_EMAIL;

  function getLink(type, hash) {
    // var url;
    var host = (app.get('host') === 'HOST') ? 'localhost' : app.get('host');
    var port = (app.get('port') === '80' || isProd) ? '': ':' + app.get('port');
    // var protocol = (app.get('protocol') === 'PROTOCOL') ? 'http' : app.get('protocol');
    var protocol = 'http://';
    return `${protocol}${host}${port}/login/${type}/${hash}`;
  }

  function sendEmail(email) {
    return app.service('/private/email').create(email).then(function (result) {
      console.log('Sent email', result);
    })
      .catch(err => {
        console.log('Error sending email', err);
      });
  }

  return {
    notifier: function(type, user) {
      console.log(`-- Preparing email for ${type}`);
      let hashLink;
      let email;
      let emailAccountTemplatesPath = path.join(__dirname, 'email-templates', 'account');
      let templatePath;
      let compiledHTML;
      
      switch (type) {
      case 'resendVerifySignup': // send another email with link for verifying user's email addr

        hashLink = getLink('verify', user.verifyToken);
          
        templatePath = path.join(emailAccountTemplatesPath, 'verify-email.pug');
        compiledHTML = pug.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail
        });
        
        email = {
          from: app.get('mailerAccount').user,
          to: user.email,
          subject: 'Confirm Signup',
          html: compiledHTML
        };

        return sendEmail(email);

      case 'verifySignup': // inform that user's email is now confirmed

        hashLink = getLink('verify', user.verifyToken);

        templatePath = path.join(emailAccountTemplatesPath, 'email-verified.pug');

        compiledHTML = pug.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail
        });

        email = {
          from: app.get('mailerAccount').user,
          to: user.email,
          subject: 'Thank you, your email has been verified',
          html: compiledHTML
        };

        return sendEmail(email);

      case 'sendResetPwd': // inform that user's email is now confirmed

        hashLink = getLink('reset', user.resetToken);

        templatePath = path.join(emailAccountTemplatesPath, 'reset-password.pug');

        compiledHTML = pug.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail
        });

        email = {
          from: app.get('mailerAccount').user,
          to: user.email,
          subject: 'Reset Password',
          html: compiledHTML
        };

        return sendEmail(email);

      case 'resetPwd': // inform that user's email is now confirmed

        hashLink = getLink('reset', user.resetToken);

        templatePath = path.join(emailAccountTemplatesPath, 'password-was-reset.pug');

        compiledHTML = pug.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail
        });

        email = {
          from: app.get('mailerAccount').user,
          to: user.email,
          subject: 'Your password was reset',
          html: compiledHTML
        };

        return sendEmail(email);

      case 'passwordChange':

        templatePath = path.join(emailAccountTemplatesPath, 'password-change.pug');

        compiledHTML = pug.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          returnEmail
        });

        email = {
          from: app.get('mailerAccount').user,
          to: user.email,
          subject: 'Your password was changed',
          html: compiledHTML
        };

        return sendEmail(email);

      case 'identityChange':
        hashLink = getLink('verifyChanges', user.verifyToken);

        templatePath = path.join(emailAccountTemplatesPath, 'identity-change.pug');

        compiledHTML = pug.compileFile(templatePath)({
          logo: '',
          name: user.name || user.email,
          hashLink,
          returnEmail,
          changes: user.verifyChanges
        });

        email = {
          from: app.get('mailerAccount').user,
          to: user.email,
          subject: 'Your account was changed. Please verify the changes',
          html: compiledHTML
        };

        return sendEmail(email);
      default:
        break;
      }
    }
  };
};