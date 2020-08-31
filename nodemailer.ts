import nodemailer from "nodemailer";

type Form = {
  name: string,
  phone: string,
  email: string;
}

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'brad.gleichner81@ethereal.email',
    pass: 'tvHrPY6DEnd694Sjdg'
  }
});


export const sendMail = (body: Form) => {
  let message = {
    from: "brad.gleichner81@ethereal.email",
    to: "brad.gleichner81@ethereal.email",
    subject: "Form",
    html: `<h1>HTML version<h1>\n<p>name: ${body.name}</p>\n<p>phone: ${body.phone}</p>\n<p>email: ${body.email}</p>`
  }

  transporter.sendMail(message, (info, err) => {
    if (info) {
      console.log(info)
    } else {
      console.log(err)
    }
  })
}