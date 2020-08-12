const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');

const calculatorRoutes = require('./api/routes/calculator');

const app = express();
var user_number = 1
app.use(cors())
app.use(bodyParser.json())
app.use(session({
    secret: "yhbvft"
}));
app.use((req, res, next) => {
    if (!req.session) {
        req.session.name = 'User-' + user_number;
        user_number++;
    }
    next();
});

app.use('/calculator', calculatorRoutes);

app.use((req, res, next) => {
    res.status(200).json({
        message: "----Requesting an API that does not exist----"
    });
});

module.exports = app;