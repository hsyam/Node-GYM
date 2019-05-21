const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const multer = require('multer')
const bodyParser = require('body-parser')
const loger = require('morgan')

const port = 3000

const app = new express() 

mongoose.connect("mongodb://localhost:27017/gym" , { useNewUrlParser: true })
require('./Models/branche')
require('./Models/department')
let db = mongoose.connection

db.once('open', ()=> {
   console.log('database connected')
});


 

app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(loger('dev'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})


  
// Routes
let Auth = require('./routes/Auth');
let Branches = require('./routes/branches');
let Deprartment = require('./routes/Deprartment');
let expenses = require('./routes/expenses');
let payment = require('./routes/payment');
let expenses_data = require('./routes/expenses-data');
let body_type = require('./routes/body-type');

// Use Routes
app.use('/auth' , Auth)
app.use('/branches', Branches)
app.use('/departments', Deprartment)
app.use('/expenses', expenses)
app.use('/payment-type', payment)
app.use('/expenses-data', expenses_data)
app.use('/body-type', body_type)

app.use((error, req, res, next) => {
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({
      message: message,
      data: data
    })
  })

const server = http.createServer(app)
server.listen(port , ()=>{
    console.log(`Serever Start at %s Port`, port)
})
