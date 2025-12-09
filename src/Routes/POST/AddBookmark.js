const express = require('express');
const router = express.Router();
const db = require('../../Config/Database/db.js');

router.post('/add_bookmark', async (req, res) => {
    const {title, desc, url, tags} = req.body;
    const token = req.cookies.accessToken;

    if(!token)
        return res.status(401).send('Please enable third-party-cookies and cross-site tracking on your browser to use this app')

    try{
        const email = token.email;

        const [accounts] = await db.execute(
            'SELECT * FROM accounts WHERE email = ?',
            [email])
    }
    catch(error){
        const message = error.message;
        console.log(message);
        res.status(500).send(message);
    }
})