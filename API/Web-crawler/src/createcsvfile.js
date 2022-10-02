const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'data.csv',
    header: [
        { id: 'Question', title: 'Question' },
        { id: 'Description', title: 'Description' },
        { id: 'Views', title: 'Views' },
        { id: 'UpVotes', title: 'UpVotes' },
        { id: 'Answers', title: 'Answers' },
    ]
});

module.exports = csvWriter;