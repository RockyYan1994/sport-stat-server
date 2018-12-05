const mysql = require('mysql');

var exports = module.exports = {};

const tableName = 'playerBasicInfo';

var connection = mysql.createConnection({
<<<<<<< HEAD
    host     : 'sport-stat-db.ce5yfibisle8.us-west-1.rds.amazonaws.com',
    user     : 'sportStatMaster',
    password : 'lgnblgnb',
    database : 'sport_stat_db'
=======
>>>>>>> 715a424023c3cc72019624a700c42be18b17ae83
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

<<<<<<< HEAD
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
=======
exports.getPlayerInfoByPage = function(page, limit, callback) {
  var start = (page - 1) * limit;
  var sql = 'SELECT * FROM player_basic_info ' + start + ' LIMIT' + limit;
  connection.query(sql, function (error, results, fields) {
    if (error) callback(error);
    callback(null, results);
  });
};
>>>>>>> 715a424023c3cc72019624a700c42be18b17ae83
