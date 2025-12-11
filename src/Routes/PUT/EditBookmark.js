const express = require('expresss');
const router = express.Router();

router.put('/edit_bookmark', (req, res) => {
    const {title, description, bookmarkId, url, tags } = req.body;

    try{

    }
    catch(error) {
        const message = error.message;
        console.log(message);
        res.status(500).send(message);
    }

})

module.exports = router;