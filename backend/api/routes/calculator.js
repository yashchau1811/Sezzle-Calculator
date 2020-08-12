const express = require('express');
const router = express.Router();

counter = 1
history = []


router.get('/', (req, res, next) => {
    res.json(history);
});

router.post('/', (req, res, next) => {
    console.log(req.body.equation);
    if (history.length == 10) {
        history.shift();
    }
    history.push({ id: counter++, calc: req.body.equation, user: req.session.name });
    res.sendStatus(200)
});



module.exports = router;