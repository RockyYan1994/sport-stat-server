var express = require('express');
var router = express();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const db = require('./../../db/sport-stat-db');

router.get('/search', function(req, res) {
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

router.get('/all', function(req, res) {
    console.log('Query all player');
    db.getAllPlayer(function(err, results) {
        if (err) {
            console.log('Query all player failed', err);
            res.status(500).send("Query Failed");
        }
        res.status(200).send(results);
    });
});

router.get('/', function(req,res) {
    var limit = req.query.limit || 20;
    console.log('Query page' + req.query.page + ', limit: ' + limit);
    db.getPlayerInfoByPage(req.query.page, limit, function(err, results) {
        if (err) {
            console.log('Query Page' + req.query.page + ' Failed');
            res.status(500).send("Query Failed");
        }
        res.status(200).send(results);
    });
});

module.exports = router;