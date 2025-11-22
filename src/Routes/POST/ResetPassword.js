const express = require('express');
const db = require('../../Config/Database/db.js');
const crypto = require('crypto')
const router = express.Router();

router.post('/reset_password', (req, res) => {
    const {token, password} = req.body;
     
   
    

    try{
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        db.execute(
            'SELECT * FROM accounts WHERE reset_token = ?',
            [hashedToken],
            (err, results) => {
                const account = results[0];
                const tokenExpirationDate = account.reset_token_expiration;

                if(tokenExpirationDate < Date.now()){
                    res.status(401).send('Token has expired');
                }
            }
        )

    }
    catch(error){
        const message = error.message;
        console.log(message);
    }
})