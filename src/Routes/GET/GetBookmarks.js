const express = require('express');
const db = require('../../Config/Database/db.js');
const {config} = require('dotenv');
const jwt = require('jsonwebtoken');
const router = express.Router();
config();

router.get('/get_bookmarks', async (req, res) => {
    const token = req.cookies.accessToken;
    const JWT_SECRET = process.env.JWT_SECRET;

    if(!token)
        return res.status(401).send('Please enable third-party-cookies and cross-site tracking on your browser');

    try{
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const accountId = decodedToken.id;

        const [results] = await db.execute(
            'SELECT * FROM bookmarks WHERE account_id = ?',
            [accountId]
        )

        res.status(200).json(results);
    }
    catch(error){
        const message = error.message;
        console.log(message);
        res.status(200).send(message);
    }
})

module.exports = router;