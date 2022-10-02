var db = require('./dbconnect');

//converts the array to array of arrays so that they can easily be pushed in the database.
var dbwrite = function(stackdata) {
    let values = stackdata.reduce((o, a) => {
        let ini = [];
        ini.push(a.Question);
        ini.push(a.Description);
        ini.push(a.Views);
        ini.push(a.UpVotes);
        ini.push(a.Answers);
        o.push(ini);
        return o;
    }, []);
    db.query('INSERT INTO stackquestion(question,Description,Views,Upvotes,Answers) VALUES ?', [values], (err, res) => {
        if (err) throw err;
    });
}
module.exports = dbwrite;