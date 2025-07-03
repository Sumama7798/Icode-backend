import nodemailer from 'nodemailer';


export const transporter = nodemailer.createTransport({
    service: 'gmail', // Replace with your email service
    auth: {
        user: 'icodelimited@gmail.com', // Replace with your email
        pass: "tjnn hbgo tcdq drbx", // Replace with your email password or app password
    },
});

export const sendEmail = (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'icodelimited@gmail.com', // Replace with the recipient email
        subject: `Email from ${firstName} ${lastName}`,
        text: `Message: ${message}\n\nFrom: ${firstName} ${lastName} (${email})`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error sending email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully!');
        }
    });
};