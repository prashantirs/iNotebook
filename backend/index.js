//Connceted to database
const connectToMongo =require('./db');
connectToMongo();

//CORS 
var cors = require('cors')

//Connceted to express server
const express = require('express')
const app = express()
const port = 5000

//CORS
app.use(cors())
//Making Get Request
app.get('/', (req, res) => {
  res.send('<H1><center>Hello Prashant</center></H1>')
})

app.use(express.json());

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})