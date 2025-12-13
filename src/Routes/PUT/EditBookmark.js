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
        res.status(500).send(message);
    }

})

module.exports = router;