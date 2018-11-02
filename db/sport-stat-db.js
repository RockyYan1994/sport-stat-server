const mysql = require('mysql');

var exports = module.exports = {};

var connection = mysql.createConnection({
    host     : 'sport-stat-db.ce5yfibisle8.us-west-1.rds.amazonaws.com',
    user     : 'sportStatMaster',
    password : 'lgnblgnb',
    database : 'player_info_spider'
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
  connection.query(
    'SELECT * from player_basic_info WHERE name = ?', [playerName], 
    function (error, results, fields) {
    if (error) callback(error);
    console.log("Mysql search results", results);
    console.log("Mysql search results[0]", results[0]);

    callback(null, results);
  });
};

exports.getAllPlayer = function(callback) {
  connection.query('SELECT * FROM player_basic_info',
  function (error, results, fields) {
    if (error) callback(error);
    callback(null, results);
  });
};