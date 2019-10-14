const express = require('express');
const app = express();
const sendMail = require('./mail');
const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
// Data parsing
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.post('/email', function (req, res) {

    const { subject, email, text} = req.body;
    console.log('Data:' , req.body);

    sendMail(email, subject, text, function(err){
        if(err){
            res.status(500).json({
                message: 'Internal Server Error'
            });
        } else {
            res.json({
                message: 'Message Sent'
            });
        }
    });
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

app.listen(PORT , function () {
    console.log('Mail server started on: ' + PORT);
});