var express = require('express');
var router = express();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const playerAverageStatService = require('./../../service/playerAverageStatService');
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

router.get('/all-name', function(req, res) {
    console.log('Query all player name');
    db.getAllPlayerName(function(err, results) {
        if (err) {
            console.log('Query all player name failed', err);
            res.status(500).send("Query Failed");
        }
        res.status(200).send(results);
    });
});

router.get('/order', function(req, res) {
    var orderItem = req.query.orderItem;
    var asc = req.query.asc;
    if (typeof req.query.asc === 'undefined') {        
        asc = true;
    }
    console.log('Query player by order ' + orderItem);
    db.getPlayerByOrder(orderItem, asc, function(err, results) {
        if (err) {
            console.log('Query player by order', err);
            res.status(500).send("Query Failed");
        }
        res.status(200).send(results);
    })
})

router.get('/average', function(req, res) {
    var playerName = req.query.playerName;
    console.log(playerName);
    playerAverageStatService.getPlayerAverageStatByName(playerName, function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Data access failed");
        }        
        res.status(200).send(results);
    });
});

router.get('/average/stat-type', function(req, res) {
    var playerName = req.query.playerName;
    var statType = req.query.statType;
    
    console.log(playerName + ', ' + statType);
    playerAverageStatService.getPlayerAverageStatByNameAndStatType(playerName, statType, function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Data access failed");
        }
        res.status(200).send(results);
    });
});

router.get('/average/seasonID', function(req, res) {
    var playerName = req.query.playerName;
    var seasonID = req.query.seasonID;
    console.log(playerName + ', ' + seasonID);
    playerAverageStatService.getPlayerAverageStatByNameAndSeasonID(playerName, seasonID, function(err, results) {
        if (err) {
            console.log(err);
            res.status(500).send("Data access failed");
        }        
        res.status(200).send(results);
    });
});

module.exports = router;