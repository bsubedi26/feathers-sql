const Proto = require('uberproto');
const Mailer = require('nodemailer');

class Service {
    constructor(transport, defaults) {
        if (!transport) {
            throw new Error('feathers-mailer: constructor `transport` must be provided');
        }

        this.transporter = Mailer.createTransport(transport, defaults);
    }

    extend(obj) {
        return Proto.extend(obj, this);
    }

    create(body, params, cb) {
        console.log('******sending email******');
        console.log('body: ', body);
        /** Body should have these properties
         * {
            "to": "higherglyphics26@gmail.com",
            "subject": "html_sent",
            "text": "BODY WILL BE TEXT.",
            "html": "<b>Hello world?</b><em>Italics</em>"
           }
         */
        // If callback argument is not set then the method returns a Promise object.
        return this.transporter.sendMail(body);
    }
}

function init(transport, defaults) {
    return new Service(transport, defaults);
}

init.Service = Service;

module.exports = init;
