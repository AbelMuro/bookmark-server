const express = require('express');
const {config} = require('dotenv');
const router = express.Router();
const db = require('../../Config/Database/db.js');
config();

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    const accessToken = process.env.access_token;

    if(!accessToken)
        res.status(401).send('Please enable third-party cookies and cross-site tracking on your browser')

    db.execute(
        'SELECT * FROM accounts WHERE email = ?',
        [email],
        (err, results) => {
            if(err)
                return res.status(404).send('Account is not registered');
            
            const account = results[0];
            if(account.password === password){
                res.cookie('accessToken', accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None'
                })
                res.status(200).send('User has successfully logged in');
            }
            else
                return res.status(401).send('Email or password is incorrect');
        }
    )

})

module.exports = router;