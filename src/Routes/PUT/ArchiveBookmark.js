const express = require('express');
const db = require('../../Config/Database/db.js');
const router = express.Router();

router.put('/archive_bookmark', async (req, res) => {
    const {bookmarkId, archived} = req.body;

    try{
        await db.execute(
            'UPDATE bookmarks SET archived = ? WHERE id = ?',
            [archived, bookmarkId]
        )

        if(archived)
            res.status(200).send('Bookmark has been archived');
        else
            res.status(200).send('Bookmark has been restored')
    }
    catch(error){
        const message = error.message;
        console.log(message);
        res.status(500).send(message);
    }
})

module.exports = router;