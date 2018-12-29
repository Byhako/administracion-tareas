'use strict'

const express = require('express')
const router = express.Router()
const cors = require("cors")

const app = express()
const corsOptions = { origin: "http://localhost:5000" }
app.use(cors(corsOptions))

app.get('/', (req, res) => {
  res.json({"estado": "conectado"})
})


const PORT = 3000
const server = app.listen(PORT, () => {
  console.log(`Listening http://localhost:${server.address().port}`)
})

module.exports = server
