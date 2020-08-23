const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASS
    }
});

let sendMain = (subject, message) => {

    var mailDetails = {
        from: process.env.EMAILUSER,
        to: process.env.EMAILTOUSER,
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