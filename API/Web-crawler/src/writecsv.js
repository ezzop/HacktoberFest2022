var csvWriter = require('./createcsvfile');

var csvwrite = function(stackdata) {
    csvWriter
        .writeRecords(stackdata)
        .then(() => console.log('The CSV file was written successfully'));
}

module.exports = csvwrite;