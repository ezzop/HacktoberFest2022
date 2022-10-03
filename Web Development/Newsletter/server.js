//jshint esversion : 6
const express = require('express')
const app = express()
const port = 3000
var path = require('path')
app.use(express.static(path.join(__dirname, '/public')));
app.get('/', (req, res) => {
    
    // app.use(express.static(path.join(__dirname, 'public', 'css')));
    res.sendFile(__dirname+"/signup.html")
  //res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})