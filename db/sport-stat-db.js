const mysql = require('mysql');

var exports = module.exports = {};

const tableName = 'playerBasicInfo';

var connection = mysql.createConnection({
    host     : 'sport-stat-db.ce5yfibisle8.us-west-1.rds.amazonaws.com',
    user     : 'sportStatMaster',
    password : 'lgnblgnb',
    database : 'sport_stat_db'
    //database : 'sport_stat_db'
  });

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// connection.query('SELECT * from player_basic_info WHERE name = "Stephen Curry"', 
//   function(err, results, fiedls) {
//     if (err) throw err;
//     console.log('The result is:', results);
//   }); 

exports.getPlayerInfoByName = function(playerName, callback) {
  var firstName = playerName.split(" ")[0];
  var lastName = playerName.split(" ")[1];
  console.log(firstName + ' ' + lastName);
  var sql = 'SELECT * from ' + tableName + ' WHERE playerFirstName = ?  AND playerLastName = ?';
  connection.query(
    sql, [firstName, lastName], 
    function (error, results, fields) {
    if (error) callback(error);
    console.log("Mysql search results", results);
    //console.log("Mysql search results[0]", results[0]);

    callback(null, results);
  });
};

exports.getAllPlayer = function(callback) {
  var sql = 'SELECT * from ' + tableName + ' ';
  connection.query(sql,
  function (error, results, fields) {
    if (error) callback(error);
    callback(null, results);
  });
};

exports.getAllPlayerName = function(callback) {
  var sql = 'SELECT CONCAT_WS(" ", `playerFirstName`, `playerLastName`) AS `playerName` from ' + tableName;
  connection.query(sql,
  function (error, results, fields) {
    if (error) callback(error);
    callback(null, results);
  });
};

exports.getPlayerByOrder = function(orderItem, asc, callback) {
  var sort = asc ? "ASC" : "DESC";
  var sql = 'SELECT * FROM ' + tableName + ' ORDER BY \`' + orderItem + '\` ' + sort;
  console.log(sql);
  connection.query(sql,
  function (error, results, fields) {
    if (error) callback(error);
    callback(null, results);
  }); 
}