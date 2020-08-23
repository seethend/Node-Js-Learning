const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

let sendMain = (subject, message) => {

    var mailDetails = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO_USER,
        subject: subject,
        text: message
    }

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if (err) {
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
};


module.exports = {
    sendMain
}