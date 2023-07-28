const nodemailer = require('nodemailer');
require('dotenv').config();

sendEmail = async function (emailAccount, message) {
  const to = 'gogohatiko@gmail.com';
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NODEMAILER_MAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });
  const mailOptions = {
    from: '"Recoded Capstone" <capstonecats@gmail.com>',
    to: to,
    subject: 'Account creation',
    text: `New account created with email ${emailAccount}, as ${message}`,
  };
  const mail = await smtpTransport.sendMail(mailOptions);
};
module.exports = sendEmail;
