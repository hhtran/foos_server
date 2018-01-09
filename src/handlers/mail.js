const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const promisify = require("es6-promisify");
import Oy from "oy-vey";
const React = require("react");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

function generateHtml(filename, options = {}) {
  const Template = require(`${__dirname}/../views/emails/${filename}.js`)
    .default;
  console.log(Template);
  const html = Oy.renderTemplate(<Template {...options} />, {
    title: "Hi! Zuko 1",
    previewText: "Hello there"
  });
  return html;
}

async function send(options) {
  debugger;
  const html = generateHtml(options.filename, options);

  const text = htmlToText.fromString(html);
  const mailOptions = {
    from: "No Reply <noreply@example.com",
    to: options.user.email,
    subject: options.subject,
    html,
    text
  };
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
}

module.exports = {
  send,
  generateHtml
};
