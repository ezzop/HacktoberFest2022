var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'airtribe',
    multipleStatements: true
});

db.connect(function(err) {
    if (err) throw err;
    let createtable = 'create table if not exists stackquestion (Number int(10) NOT NULL, Question text NOT NULL UNIQUE, Description text NOT NULL UNIQUE, Views varchar(1000) NOT NULL, UpVotes varchar(1000) NOT NULL, Answers varchar(1000) NOT NULL)';
    db.query(createtable, function(err, result, fields) {
        if (err) throw err;
    });
});

module.exports = db;