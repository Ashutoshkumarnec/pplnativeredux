var nodemailer = require("nodemailer");
sails.log.debug("try to send mail");
var smtpTransport = nodemailer.createTransport("SMTP", {
  service: "Gmail",
  auth: {
    XOAuth2: {
      user: "ashutoshkumarnec18@gmail.com", // Your gmail address.
      clientId:
        "35638983681-os51k64c16ildducmupus75qkj1h9t3c.apps.googleusercontent.com",
      clientSecret: "wZeojgUra7a8Tyx8mpC8hc-_"
    }
  }
});
// Setup mail configuration
var mailOptions = {
  from: "ashutoshkumarnec18@gmail.com", // sender address
  to: "ashutoshkumarnec18@gmail.com", // list of receivers
  subject: "hii", // Subject line
  // text: '', // plaintext body
  html: htmlBody // html body
};
// send mail
smtpTransport.sendMail(mailOptions, function(error, info) {
  if (error) {
    sails.log.debug(error);
    return res.notOk({
      status: "error",
      msg: "Email sending failed"
    });
  } else {
    console.log("Message %s sent: %s", info.messageId, info.response);
    return res.ok({
      status: "ok",
      msg: "Email sent"
    });
  }
  smtpTransport.close();
});
