const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {config} = require('dotenv');
const db = require('../../Config/Database/db.js');
config();

router.post('/add_bookmark', async (req, res) => {
    const {title, desc, url, tags, createdAt} = req.body;
    const JWT_SECRET = process.env.JWT_SECRET;
    const token = req.cookies.accessToken;

    if(!token)
        return res.status(401).send('Please enable third-party-cookies and cross-site tracking on your browser to use this app')

    try{
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const account_id = decodedToken.id;
        const bookmarkId = crypto.randomUUID();

        await db.execute(
            'INSERT INTO bookmarks (id, account_id, title, description, url, tags, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [bookmarkId, account_id, title, desc, url, tags, createdAt]);

        res.status(200).send('Bookmark has been saved');
    }
    catch(error){
        const message = error.message;
        console.log(message);
        res.status(500).send(message);
    }
});

module.exports = router;