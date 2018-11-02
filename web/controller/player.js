var express = require('express');
var router = express();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const db = require('./../../db/sport-stat-db');

router.get('/', function(req, res) {
    var playerName = req.query.playerName;
    console.log(playerName);
    db.getPlayerInfoByName(playerName, function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Data access failed");
        }        
        res.status(200).send(results[0]);
    });        
});

module.exports = router;