import express from "express";
import { sendMail } from "../nodemailer";
const router = express.Router();

type LooseObject = {
  [key: string]: any
}

const validate = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {name, phone, email} = req.body;
  let errors:LooseObject = {}
  !name && (errors.name = "feltet 'name' må fylles ut")
  !phone && (errors.phone = "feltet 'phone' må fylles ut")
  !email && (errors.email = "feltet 'email' må fylles ut")
  if (name && name && !name.match(/^([a-zA-Z]){2,}([" "]){1}([a-zA-Z" "]){2,}$/g)) {
    errors.name = "Ikke gyldig navn"
  }
  if (phone && !phone.match(/^(0047|\+47|47){0,1}[2-9]{1}\d{7}$/g)) {
    errors.phone = "Ikke gyldig telefonnummer"
  }
  if (email && !email.match(/^[\w-.+]+@([\w-]+\.)+\w{2,}$/g)) {
    errors.email = "Ikke gyldig e-post"
  }
  if (Object.keys(errors).length != 0) {
    res.status(422).send(errors)
    return;
  }
  next();
}

const spamFilter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {fax, timestamp} = req.body;
  const date = new Date();
  if (!fax && timestamp && (+ date) - timestamp < 2000 || fax != "") {
    res.send({msg: "Takk for henvendelsen (selvom det sannsynligvis er spam)"})
    return;
  }
  next()
}

router.post("/", validate, spamFilter, (req, res) => {
  // sendMail(req.body);
  res.send({msg: "Takk for henvendelsen"})
})

export default router;

