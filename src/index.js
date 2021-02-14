const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
    requireTLS: true,
    auth: {
    user: "email@gmail.com",
    pass: "password",
   },
  secure: true,
});

app.post('/contact', (req, res) => {
    const { name, email, text } = req.body;
    const mailData = {
        from: 'customer.guwahatioptical0@gmail.com',
        to: 'guwahatioptical0@gmail.com',
        subject: 'Mail from customer',
        text: `Name:${name}
               Email:${email}
               Message:${text}`
    };

    transporter.sendMail(mailData, ( error, info ) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: 'success', message_id: info.messageId });
    })
})
app.get('/', (req, res) => {
    res.status(200).send("success");
})

module.exports = app;