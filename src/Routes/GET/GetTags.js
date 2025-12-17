const express = require('express');
const db = require('../../Config/Database/db.js');
const jwt = require('jsonwebtoken');
const {config} = require('dotenv');
const router = express.Router();
config();

router.get('/get_tags', async (req, res) => {
    try{
        const JWT_SECRET = process.env.JWT_SECRET;
        const accessToken = req.cookies.accessToken;
        
        if(!accessToken)
            res.status(401).send('Please enable third-party-cookies and cross-site tracking to use this app')

        const decodedToken = jwt.verify(accessToken, JWT_SECRET);
        const accountId = decodedToken.id;

        const [result] = await db.execute(
            'SELECT * FROM bookmarks WHERE account_id = ?',
            [accountId]
        );

        const hashMap = {};

        result.forEach((bookmark) => {
            const tags = bookmark.tags.split(',');

            tags.map((tag) => {
                hashMap[tag] = (hashMap[tag] || 0) + 1;
            }); 
        })

        res.status(200).json(Object.entries(hashMap));
    }
    catch(error){
        const message = error.message;
        console.log(message);
        res.status(500).send(message);
    }
});

module.exports = router;