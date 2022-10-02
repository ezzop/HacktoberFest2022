const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
var db = require('./dbconnect');
var csvwrite = require("./writecsv");
var dbwrite = require("./dbwrite");

var scrapeData = async function(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        //id and class common to all the questions in stackoverflow
        const listItems = $("#questions .question-summary");
        const stackdata = [];
        //used to store each question
        listItems.each((idx, el) => {
            const questions = {
                Question: "",
                Description: "",
                Views: "",
                UpVotes: "",
                Answers: "",
            };
            questions.Question = $(el).children(".summary").children("h3").children("a").text().trim();
            questions.Description = $(el).children(".summary ").children(".excerpt ").text().trim();
            questions.Views = $(el).children(".statscontainer ").children(".views ").text().trim().replace('views', '').replace('view', '');
            questions.UpVotes = $(el).children(".statscontainer ").children(".stats ").children(".vote ").children(".votes ").children(".vote-count-post ").text().trim();
            questions.Answers = $(el).children(".statscontainer ").children(".stats ").children(".status ").text().trim().replace('answers', '').replace('answer', '');
            stackdata.push(questions);
        });
        console.dir(stackdata);
        csvwrite(stackdata);
        dbwrite(stackdata);
        db.end((err) => {});
    } catch (err) {
        console.error(err);
    }
}


module.exports = scrapeData;