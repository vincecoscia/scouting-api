const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
  const msg = {
    to: options.email, // Change to your recipient
    from: {
      email: process.env.FROM_EMAIL,
      name: process.env.FROM_NAME,
    }, // Change to your verified sender
    subject: options.subject,
    text: options.message,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log(msg);
    })
    .catch((err) => {
      console.error(err);
    });
};

module.exports = sendEmail;
