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


// Registrar nuevo usuario
app.post('/register', async (req, res) => {
  const {name, email, password } = req.body
  const id = await mongoDB.createUser(name, email, password)
  
  if (id) {
    res.json({ id, validName: true })
  } else {
    res.json({ id, validName: false })
  }
})


// Login
app.post('/login', async (req, res) => {
  const {email, password } = req.body
  const user = await mongoDB.login(email)
  
  console.log(user[0])

  if (user[0]) {
    if (user[0].password === password) {
      // usuario valido
      res.json({"user": true, "password": true, "name": user[0].name, tasks: user[0].tasks})
    } else {
      // password incorrecto
      res.json({"user": true, "password": false, "name": null})
    }
  } else {
    // Usuario no encontrado
      res.json({"user": false, "password": false, "name": null})
  }
  // res.json({ login })
})


// Actualiza lista de tareas tarea
app.post('/updateTasks', async (req, res) => {
  const { name, tasks } = req.body
  await mongoDB.updateTasks(name, tasks)
  res.json({"state":"User updated successfully"})
})


const PORT = 3000
const server = app.listen(PORT, () => {
  console.log(`Listening http://localhost:${server.address().port}`)
})
