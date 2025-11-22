const express = require('express');
const {config} = require('dotenv');
const router = express.Router();
const db = require('../../Config/Database/db.js');
config();

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const accessToken = process.env.access_token;

    if(!accessToken)
        res.status(401).send('Please enable third-party cookies and cross-site tracking on your browser')

    try{
        const [accounts] = await db.execute(
            'SELECT * FROM accounts WHERE email = ?',
            [email])

        if(accounts[0].password === password){
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

    catch(error){
        if(error.code)
            res.status(404).send('Account is not registered');
        else{
            const message = error.message;
            res.status(500).send(message);            
        }
    }
})

module.exports = router;