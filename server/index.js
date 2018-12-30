'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors")
const corsOptions = { origin: "http://localhost:5000" }

const app = express()
app.use(cors(corsOptions))
app.use(bodyParser.json())

const MongoLib = require('./services/mongo')
const mongoDB = new MongoLib()
// me conecto a la base de datos.
mongoDB.connect()


app.get('/', (req, res) => {
  res.json({"estado": "conectado"})
})

app.post('/registrar', (req, res) => {
  console.log(req.body)
  res.json({"estado": "conectado"})
})

app.put('/put', (req, res) => {
  console.log(req.body)
  res.json({"estado": "conectado"})
})

app.delete('/delete', (req, res) => {
  console.log(req.body)
  res.json({"estado": "conectado"})
})

// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------
// ------------------------------------------------------



app.post('/register', async (req, res) => {
  const {name, email, password } = req.body
  const id = await mongoDB.createUser(name, email, password)
  
  if (id) {
    res.json({ id, validName: true })
  } else {
    res.json({ id, validName: false })
  }
})


const PORT = 3000
const server = app.listen(PORT, () => {
  console.log(`Listening http://localhost:${server.address().port}`)
})

//module.exports = server
