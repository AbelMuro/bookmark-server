const express = require('express');
const {config} = require('dotenv');
const nodemailer = require('nodemailer');
const crypto = require('crypto')
const router = express.Router();
const db = require('../../Config/Database/db.js');
config();

router.post('/create_token', async (req, res) => {
    const {email} = req.body;

    try{
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const resetPasswordExpires = Date.now() + 10 * 60 * 1000;
        const resetLink = `http://localhost:3000/reset/${resetToken}`;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            secure: true,
            port: 465,
            auth: {
                user: process.env.email,
                pass: process.env.app_password
            },
        });

        const mailOptions = {
            from: process.env.email,
            to: email,
            subject: 'Reset Link for Bookmark manager app',
            text: `Please click on the following link to reset your password ${resetLink}
                    Token will expire in 60 minutes.
                `
        }


        const results = await db.execute(
            'UPDATE accounts SET reset_token = ?, reset_token_expiration = ? WHERE email = ?',
            [resetPasswordToken, resetPasswordExpires, email])        

        
        transporter.sendMail(mailOptions, (error, info) => {
                if(error)
                    return res.status(401).send(error.message);

                res.status(200).send('Email send successfully');
            });
    }  
    catch(error){
        if(error.code)
            return res.status(404).send(error.code);
        else{
            const message = error.message;
            console.log(message);            
        }
    }

})

module.exports = router;