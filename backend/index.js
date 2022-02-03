//Connceted to database
const connectToMongo =require('./db');
connectToMongo();

//Connceted to express server
const express = require('express')
const app = express()
const port = 3000

//Making Get Request
app.get('/', (req, res) => {
  res.send('Hello Prashant')
})

//Making another Get Request
app.get('/next_page', (req, res) => {
  res.send('It is next page')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})