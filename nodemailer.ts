import nodemailer from "nodemailer";

type Form = {
  name: string,
  phone: string,
  email: string;
}

export const sendMail = (body: Form) => {
  nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    let transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
          user: account.user,
          pass: account.pass
      }
    });

    let message = {
      from: 'Sender Name <sender@example.com>',
      to: 'Recipient <recipient@example.com>',
      subject: "Form",
      html: `<h1>HTML version<h1>\n<p>name: ${body.name}</p>\n<p>phone: ${body.phone}</p>\n<p>email: ${body.email}</p>`
    }

    transporter.sendMail(message, (err, info) => {
      if (err) {
          console.log('Error occurred. ' + err.message);
          return process.exit(1);
      }

      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
  }
  )}