const nodemailer = require("nodemailer");
require("dotenv").config("../");

exports.handler = function (event, context, callback) {
  const { name, email, subject, message } = JSON.parse(event.body);

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "vajresh005@gmail.com",
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  transporter.sendMail(
    {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `Mail From Website (${subject}) ${new Date().toLocaleString()}`,
      text: emailTemplate(name, email, message),
    },
    function (error, info) {
      if (error) {
        return callback(error);
      }

      callback(null, {
        statusCode: 200,
        body: JSON.stringify("Ok"),
      });
    },
  );
};

function emailTemplate(name, email, message) {
  return `Hii, Balan, ${name} messaged you from your website.\n
      \tEmail: ${email}\n
      \tMessage: ${message}`;
}
