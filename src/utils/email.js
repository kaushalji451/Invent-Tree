"use server"
const nodemailer = require("nodemailer");
// Setup transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const sendEmailforContactus = async (formData) => {
    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: `New Contact Form Submission: ${formData.subject || "N/A"}`,
        text: `Dear Admin,

A new contact request has been submitted. Below are the details:

Name: ${formData.name || "N/A"}
Email: ${formData.email || "N/A"}
Phone: ${formData.phone || "N/A"}
Organization: ${formData.organization || "N/A"}
Language: ${formData.language || "N/A"}
Subject: ${formData.subject || "N/A"}

Message:
${formData.message || "N/A"}

Submitted At: ${new Date(formData.createdAt || Date.now()).toLocaleString()}

Regards,  
Invent-Tree Contact System`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent successfully:", info.response);
        }
    });
};

export default sendEmailforContactus;