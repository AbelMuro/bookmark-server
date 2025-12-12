const express = require('express');
const db = require('../../Config/Database/db');
const router = express.Router();

router.put('/edit_bookmark', async (req, res) => {
    const {title, description, bookmarkId, url, tags} = req.body;

    try{
        const results = await db.execute(
            'UPDATE bookmarks SET title = ?, description = ?, url = ?, tags = ? WHERE id = ?',
            [title, description, url, tags, bookmarkId]
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