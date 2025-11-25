const express = require('express');
const db = require('../../Config/Database/db.js');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.post('/reset_password', async (req, res) => {
    const {token, password} = req.body;
     
    try{
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const [accounts] = await db.execute(
            'SELECT * FROM accounts WHERE reset_token = ?',
            [hashedToken])

        const account = accounts[0];
        const reset_token_expiration = account.reset_token_expiration;

        if(reset_token_expiration < Date.now())
            return res.status(401).send('Token has expired');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
    
        await db.execute(
            'UPDATE accounts SET password = ?, reset_token = ?, reset_token_expiration = ? WHERE reset_token = ?',
            [hashedPassword, null, null, hashedToken],
        )

        res.status(200).send('Password has been updated');

    }
    catch(error){
        const message = error.message;
        console.log(message);
    }
})

module.exports = router;