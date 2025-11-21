const express = require('express');
const db = require('../../Database/db.js');
const router = express.Router();

router.post('/create_account', (req, res) => {
    const {email, name, password} = req.body;

    db.execute(
        'INSERT INTO accounts (email, password) VALUE (?, ?)',
        [email, password],
        (err, results) => {
            if(err)
                return res.status(500).json(err);

            const message = results.message;
            res.status(200).send(message);
        }
    )

})

module.exports = router;
