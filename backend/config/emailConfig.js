import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Apni email ID (e.g., yourname@gmail.com)
        pass: process.env.EMAIL_PASS, // App Password (Google se generate karna hoga)
    },
});