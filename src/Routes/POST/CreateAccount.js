const express = require('express');
const db = require('../../Config/Database/db.js');
const router = express.Router();

router.post('/create_account', (req, res) => {
    const {email, name, password} = req.body;

    db.execute(
        'INSERT INTO accounts (email, password, name) VALUE (?, ?, ?)',
        [email, password, name],
        (err, results) => {
            if(err && err.code === 'ER_DUP_ENTRY')
                return res.status(500).send('Email is already registered');

            const message = results.message;
            res.status(200).send(message);
        }
    )

})

module.exports = router;
