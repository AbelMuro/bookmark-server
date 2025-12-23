const express = require('express');
const db = require('../../Config/Database/db.js');
const router = express.Router();

router.delete('/delete_bookmark/:id', async (req, res) => {
    const bookmarkId = req.params.id;

    try{
        const [result] = await db.execute(
            'DELETE FROM bookmarks WHERE id = ?',
            [bookmarkId]
        )

        console.log(result);

        res.status(200).send('Bookmark has been successfully deleted');
    }
    catch(error){
        const message = error.message;
        console.log(message);
    }
});

module.exports = router;