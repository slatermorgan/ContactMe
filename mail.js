const nodemailer = require('nodemailer');
const mailGun    = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: 'api key goes here',
        domain: 'domain goes here'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

function sendMail(email, subject, text, callback){
    const mailOptions = {
        from: 'slatermorgan@noreply.com',
        to: 'slatermorgan@hotmail.com',
        subject: 'Website Contact: ' + email + ' with subject: ' + subject,
        text
    };

    transporter.sendMail(mailOptions, function(err, data){
        if(err){
            callback(err, null);
            console.log(err);
        } else {
            callback(null, data);
            console.log('success');
        }
    });
};

module.exports = sendMail;