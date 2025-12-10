const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../../Config/Database/db.js');
const router = express.Router();

router.post('/create_account', async (req, res) => {
    const {email, name, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try{
        await db.execute(
            'INSERT INTO accounts (email, password, name) VALUE (?, ?, ?)',
            [email, hashedPassword, name]);

        res.status(200).send('Account has been created');
    }
    catch(error){
        if(error.code === 'ER_DUP_ENTRY')
            res.status(500).send('Email is already registered');
        else{
            const message = error.message;
            res.status(500).send(message);            
        }
    }

})

module.exports = router;
