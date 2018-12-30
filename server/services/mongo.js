const mongoose = require('mongoose')


class MongoLib {
  constructor () {
    this.User = ''
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
        console.log('pp:', users)
        resolve(users)
      })
    })
  }

  createUser (name, email, password) {
    const userNames = this.getNames()
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
