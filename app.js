const express = require('express');

const port = process.env.PORT || 3000;
var app = express();

app.get('/', (req, res) => {
    res.send("Hi, Siri!");
});

app.listen(port, () => {
    console.log(`server is run on port : ${port}`);
});