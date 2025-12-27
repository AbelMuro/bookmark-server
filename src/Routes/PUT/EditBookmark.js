const express = require('express');
const db = require('../../Config/Database/db');
const router = express.Router();

router.put('/edit_bookmark', async (req, res) => {
    const {title, description, bookmarkId, url, tags, dateUpdated} = req.body;

    try{
        await db.execute(
            'UPDATE bookmarks SET title = ?, description = ?, url = ?, tags = ?, last_updated = ? WHERE id = ?',
            [title, description, url, tags, dateUpdated, bookmarkId]
        )

        res.status(200).send('Bookmark has been updated');
    }
    catch(error) {
        const message = error.message;
        console.log(message);
        if(error.code === 'ER_DATA_TOO_LONG'){
            if(message.includes('tags'))
                res.status(402).send('Bookmark has too many tags')
            else if(message.includes('url'))
                res.status(402).send('Bookmark url is too long')
            else if(message.includes('title'))
                res.status(402).send('Bookmark title is too long')
        }
        else
            res.status(500).send(message);
    }

})

module.exports = router;