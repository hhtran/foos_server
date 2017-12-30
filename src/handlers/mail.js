const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");
const promisify = require("es6-promisify");
const { renderTemplate } = require("oy-vey");
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
  const {
    template,
    title,
    previewText
  } = require(`${__dirname}/../views/emails/${filename}`);
  const html = renderTemplate(template, {
    title,
    previewText
  });
}

async function send(options) {
  const mailOptions = {
    from: "No Reply <noreply@example.com",
    to: options.user.email,
    subject: options.subject,
    html: "Fill in later",
    text: "Fill in later"
  };
  const sendMail = promisify(transport.sendMail, transport);
  return sendMail(mailOptions);
}

module.exports = {
  send,
  generateHtml
};
