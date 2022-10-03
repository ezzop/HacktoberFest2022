//jshint esversion:6
const express = require('express')
const https= require("https")
const app = express()
const port = 3000
const bodyParser=require("body-parser")
const { request } = require('http')

app.use(bodyParser.urlencoded({extended: true}));




app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
  
});

app.post("/", function(req, res){
    console.log(req.body.cityName)
})


// const api="https://v2.jokeapi.dev/joke/Programming?type=single"
//     https.get(api,function(response){
//         response.on("data", function(data){
//             jokedata=JSON.parse(data);
//             const joke=jokedata.joke
//             res.write("<h1>"+ joke+"</h1>")
//             const nsfw=jokedata.flags.explicit
//             if(nsfw)
//             res.write("The joke is NSFW")
//             else
//             res.write("The joke is not NSFW")
//             res.send()
//         })
       
//     })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})