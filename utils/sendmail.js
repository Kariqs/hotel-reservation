import nodemailer from "nodemailer";
import MailGen from "mailgen";
import dotenv from "dotenv";
dotenv.config();

export const bookingEmail = async (email, name, intro, subject, action) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let MailGenerator = new MailGen({
    theme: "default",
    product: {
      name: "COMFY INN ELDORET",
      link: "https://mailgen.js",
    },
  });

  let response = {
    body: {
      name: name,
      intro: intro,
      action: action,
      outro: "Enjoy your stay with us.",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: mail,
  };

  try {
    await transporter.sendMail(message);
    console.log("Email sent.");
  } catch (err) {
    console.log(err);
  }
};
