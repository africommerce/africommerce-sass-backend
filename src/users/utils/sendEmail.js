const nodemailer = require('nodemailer')
require('dotenv').config()

const mailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.NODEMAILER_PASS,
  },
}

const sendEmail = async ({ from, to, subject, html }) => {
  const transporter = nodemailer.createTransport(mailConfig)
  return transporter.sendMail({ from, to, subject, html })
}

module.exports=sendEmail


