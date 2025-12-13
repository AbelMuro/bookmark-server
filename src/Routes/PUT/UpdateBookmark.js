const express = require('express');
const db = require('../../Config/Database/db.js');
const router = express.Router();

router.put('/update_bookmark', async (req, res) => {
    const {bookmarkId, prevViews} = req.body;

    try{
        await db.execute(
            'UPDATE bookmarks SET views = ? WHERE id = ?',
            [prevViews + 1, bookmarkId]
        )
        
        res.status(200).send("Bookmarks' views has been updated");
    }
    catch(error){
        const message = error.message;
        console.log(message);
        res.status(500).send(message);
    }
})

module.exports = router;