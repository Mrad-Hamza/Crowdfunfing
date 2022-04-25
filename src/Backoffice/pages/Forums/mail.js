
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
             auth: {
                 user: "yasmine.chaieb@esprit.tn",
                 pass: "203JFT2277"
             }
     });
     var mailOptions = {
     
      from: "yasmine.chaieb@esprit.tn",
      to: "jessymina.jc@gmail.com",
      subject: "Subject",
      text: "Hello SMTP Email"
     };
     transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });