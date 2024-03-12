const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/submit-job-request', async (req, res) => {
    const { name, email, website, jobDescription } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pretendthisismy@gmail.com', 
            pass: 'notmypassword'
        }
    });

    let mailOptions = {
        from: email, 
        to: 'admin@example.com', 
        subject: 'New Job request', 
        text: `Name: ${name}\nEmail: ${email}\nWebsite: ${website}\nJob Description: ${jobDescription}` // Email body
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Job request submitted successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error submitting job request.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
