const playerBasicInfo = require('./../db/sport-stat-db'),
      playerAverageStat = require('./../db/player-average-stat-db');


var exports = module.exports = {};

exports.getPlayerAverageStatByName = function(playerName, callback) {    
    playerBasicInfo.getPlayerInfoByName(playerName, function(err, result) {
        if (err) callback(err);
        var playerID = result[0].playerID;
        console.log('get average stat by name, playerID: ' + playerID);
        playerAverageStat.getPlayerAverageStatByName(playerID, function(err, results) {
            if (err) {
                console.log('get playerId : {$playerID} failed.');
                callback(err);
            }
            console.log('get playerId : {$playerID} success.');
            callback(null, results);
        });
    });    
}

exports.getPlayerAverageStatByNameAndStatType = function(playerName, statType, callback) {    
    playerBasicInfo.getPlayerInfoByNameAndStatType(playerName, statType, function(err, result) {
        if (err) callback(err);
        var playerID = result[0].playerID;
        console.log('get average stat by name, playerID: ' + playerID + ' statType: ' + statType);
        playerAverageStat.getPlayerAverageStatByName(playerID, function(err, results) {
            if (err) {
                console.log('get playerId : {$playerID} failed.');
                callback(err);
            }
            console.log('get playerId : {$playerID} success.');
            callback(null, results);
        });
    });    
}

exports.getPlayerAverageStatByNameAndSeasonID = function(playerName, seasonID, callback) {    
    playerBasicInfo.getPlayerInfoByName(playerName, seasonID, function(err, result) {
        if (err) callback(err);
        var playerID = result[0].playerID;
        console.log('get average stat by name, playerID: ' + playerID + ' seasonID: ' + seasonID);
        playerAverageStat.getPlayerAverageStatByName(playerID, seasonID, function(err, results) {
            if (err) {
                console.log('get playerId : {$playerID} failed.');
                callback(err);
            }
            console.log('get playerId : {$playerID} success.');
            callback(null, results);
        });
    });    
}

exports.getPlayerAverageStatByNameAndStatTypeAndSeasonID = function(playerName, statType, seasonID, callback) {    
    playerBasicInfo.getPlayerInfoByName(playerName, function(err, result) {
        if (err) callback(err);
        var playerID = result[0].playerID;
        console.log('get average stat by name, playerID: ' + playerID + ' statType' + statType + ' seasonID: ' + seasonID);
        playerAverageStat.getPlayerAverageStatByName(playerID, statType, seasonID, function(err, results) {
            if (err) {
                console.log('get playerId : {$playerID} failed.');
                callback(err);
            }
            console.log('get playerId : {$playerID} success.');
            callback(null, results);
        });
    });    
}