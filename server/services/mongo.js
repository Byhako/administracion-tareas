const mongoose = require('mongoose')


class MongoLib {
  constructor () {
    this.Users = ''
    // esquema
    this.Schema = mongoose.Schema
    this.userSchema = new this.Schema({
      _id: mongoose.Types.ObjectId,
      name: String,
      email: String,
      password: String,
      tasks: [{nameTask: String, priority: String, date: String}]
    })
  }

  connect () {
    mongoose.connect('mongodb://localhost:27017/adminTask',
      {useNewUrlParser: true},
      function (err) {
        if (err) throw err
        console.log('Successfully connected')
      }
    )
    // creamos modelo  --> collection in mongoDb
    this.Users = mongoose.model('Users', this.userSchema)
  }

  getNames () {
    return new Promise((resolve, reject) => {
      this.Users.find({}, {name:1, _id:0}, (err, users) => {
        if (err) reject(err)
        resolve(users)
      })
    })
  }

  async createUser (name, email, password) {
    const userNames = await this.getNames()
    const listNames = userNames.map(i => i.name)

    console.log(listNames)
    console.log('buscando: ', name)
    console.log(listNames.indexOf(name))

    if (listNames.indexOf(name) === -1) {
      // creamos usuario
      const id = new mongoose.Types.ObjectId
      const newUser = new this.Users ({
        _id: id,
        name,
        email,
        password,
        tasks: []
      })

      return new Promise((resolve, reject) => {
        newUser.save(err => {
          if (err) reject(err)
          resolve(id)
          console.log('User successfully saved.')
        })
      })

    } else {
      // usuario ya existe
      return null
    }
  }

  get(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).findOne({ _id: ObjectId(id) })
      })
  }

  create(collection, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).insertOne(data)
      })
      .then(result => result.insertedId)
  }

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true })
      })
      .then(result => result.upsertedId || id)
  }

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) })
      })
      .then(() => id)
  }
}

module.exports = MongoLib
