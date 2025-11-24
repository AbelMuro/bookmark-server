const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {config} = require('dotenv');
const router = express.Router();
const db = require('../../Config/Database/db.js');
config();

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const JWT_SECRET = process.env.JWT_TOKEN;

    try{
        const [accounts] = await db.execute(
            'SELECT * FROM accounts WHERE email = ?',
            [email])

        const hashedPassword = accounts[0].password;
        const match = await bcrypt.compare(password, hashedPassword);
        if(!match)
            return res.status(401).send('Email or password is incorrect');

        const token = jwt.sign({...accounts[0]}, JWT_SECRET);
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        res.status(200).send('User has successfully logged in');
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