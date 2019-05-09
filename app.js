const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const multer = require('multer')
const bodyParser = require('body-parser')
const upload = multer({ dest: 'uploads/' })
const app = new express() 
const port = 3000

mongoose.connect("mongodb://localhost:27017/gym" , { useNewUrlParser: true })
require('./Models/branche')
require('./Models/department')
let db = mongoose.connection

db.once('open', ()=> {
   console.log('database connected')
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
  })

  
// Routes
let Auth = require('./routes/Auth');
let Branches = require('./routes/branches');

// Use Routes
app.use('/auth' , Auth)
app.use('/branches' , Branches)



const server = http.createServer(app)
server.listen(port , ()=>{
    console.log(`Serever Start at %s Port`, port)
})
