const express = require('express');
const db = require('../../Config/Database/db.js');
const router = express.Router();

router.put('/pin_bookmark', async (req, res) => {
    const {pin_state, bookmarkId} = req.body;

    try{
        await db.execute(
            'UPDATE bookmarks SET pinned = ? WHERE id = ?',
            [pin_state, bookmarkId]
        )

        res.status(200).send('Bookmark has been pinned');
    }
    catch(error){
        const message = error.message;
        console.log(message);
        res.status(500).send(message);
    }
})

module.exports = router;