require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
	const {
        message,
        name,
        email,
        redirect
    } = req.body;

    const msg = {
        to: process.env.TO_EMAIL, // Change to your recipient by adding TO_EMAIL to .env
        from: process.env.FROM_EMAIL, // Change to your verified sender by adding FROM_EMAIL to .env
        subject: 'Contact Form Submission',
        text: `Message: ${message} Name: ${name} Email: ${email}`,
        html: `
            <strong>Message:</strong>
            <p>${message}</p>
            <strong>Name:</strong>
            <p>${name}</p>
            <strong>Email:</strong>
            <p>${email}</p>
        `,
    }

    sgMail
        .send(msg)
        .then(() => {
        console.log('Email sent')
        res.redirect(`${redirect}?submit=true`)
    })
        .catch((error) => {
        console.error(error)
        res.end()
    })

});

app.listen(port, (error) => {
    if (error) throw error;
    console.log(`Listening on port ${port}`);
});