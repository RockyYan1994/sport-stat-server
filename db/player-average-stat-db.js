const mysql = require('mysql');

const tableName = "playerAverageStat";

var exports = module.exports = {};

var connection = mysql.createConnection({
    host     : 'sport-stat-db.ce5yfibisle8.us-west-1.rds.amazonaws.com',
    user     : 'sportStatMaster',
    password : 'lgnblgnb',
    database : 'sport_stat_db'
  });

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

exports.getPlayerAverageStatByName = function(playerID, callback) {
  var sql = 'SELECT * from ' + tableName + ' WHERE playerID = ?';
  connection.query(
    sql, [playerID], 
    function (error, results, fields) {
    if (error) callback(error);
    //console.log("Mysql search results", results);
    console.log("Mysql search results[0]", results[0]);

    callback(null, results);
  });
};

exports.getPlayerAverageStatByNameAndStatType = function(playerID, statType, callback) {
  var sql = 'SELECT * from ' + tableName + ' WHERE playerID = ? AND statType = ? ';
  connection.query(
    sql, [playerID, statType], 
    function (error, results, fields) {
    if (error) callback(error);
    //console.log("Mysql search results", results);
    console.log("Mysql search results[0]", results[0]);

    callback(null, results);
  });
};

exports.getPlayerAverageStatByNameAndSeasonID = function(playerID, seasonID, callback) {
  var sql = 'SELECT * from ' + tableName + ' WHERE playerID = ? AND seasonID = ? ';
  connection.query(
    sql, [playerID, seasonID],
    function (error, results, fields) {
    if (error) callback(error);
    //console.log("Mysql search results", results);
    console.log("Mysql search results[0]", results[0]);

    callback(null, results);
  });
};

exports.getPlayerAverageStatByNameAndStatTypeAndSeasonID = function(playerID, statType, seasonID, callback) {
  var sql = 'SELECT * FROM ' + tableName + ' WHERE playerID = ? AND statType = ? AND seasonID = ? ';
  connection.query(
    sql, [playerID, statType, seasonID], 
    function (error, results, fields) {
    if (error) callback(error);
    //console.log("Mysql search results", results);
    console.log("Mysql search results[0]", results[0]);

    callback(null, results);
  });
}