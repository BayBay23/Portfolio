const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Create transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'rajendraatluri2303@gmail.com', // replace with your email
            pass: 'rawisjericho' // replace with your email password or app password
        }
    });

    // Email options
    let mailOptions = {
        from: email,
        to: 'rajendraatluri2303@gmail.com',
        subject: `Contact form submission from ${name}`,
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error'); // Respond with error
        } else {
            console.log('Email sent: ' + info.response);
            res.send('success'); // Respond with success
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
