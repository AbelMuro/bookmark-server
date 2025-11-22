const express = require('express');
const {config} = require('dotenv');
const nodemailer = require('nodemailer');
const router = express.Router();
const db = require('../../Config/Database/db.js');
config();

router.post('/create_token', (req, res) => {
    const {email} = req.body;
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    const resetPasswordLink = `http://localhost:3000/reset/${resetToken}`;
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.email,
            pass: process.env.app_password
        }
    })

    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: 'Reset Link for Bookmark manager app',
        text: `Please click on the following link to reset your password ${resetLink}`
    }


    db.execute(
        'UPDATE accounts SET reset_token = ? reset_token_expiration = ? WHERE email = ?',
        [resetPasswordToken, resetPasswordExpires, email],
        (err, results) => {
            if(err)
                return res.status(404).send('Email is not registered');
            
            transporter.sendMail(mailOptions, (error, info) => {
                if(error)
                    return res.status(401).send(error.message);

                res.status(200).send('Email send successfully');
            
            })
        }
    )
})