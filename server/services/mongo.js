const mongoose = require('mongoose')


class MongoLib {
  constructor () {
    this.Users = ''
    // Crear esquema
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
    // Coneccion con la base de datos
    mongoose.connect('mongodb://localhost:27017/adminTask',
      {useNewUrlParser: true},
      function (err) {
        if (err) throw err
        console.log('Successfully connected')
      }
    )
    // Creamos modelo  --> collection en mongoDb
    this.Users = mongoose.model('Users', this.userSchema)
  }


  getNames () {
    // Obtengo todos los nombres registrados en la db
    return new Promise((resolve, reject) => {
      this.Users.find({}, { name:1, _id:0 }, (err, users) => {
        if (err) reject(err)
        resolve(users)
      })
    })
  }


  async createUser (name, email, password) {
    // Crear nuevo usuario en la db
    const userNames = await this.getNames()
    const listNames = userNames.map(i => i.name)

    // Verifico si ya hay usuario registrado con el nombre enviado
    if (listNames.indexOf(name) === -1) {
      // Creamos usuario
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
      // El usuario ya existe
      return null
    }
  }


  login (email) {
    // Busco si hay usuario registrado con email enviado
    return new Promise((resolve, reject) => {
      this.Users.find({email}, (err, users) => {
        if (err) reject(err)
        resolve(users)
      })
    })
  }


  updateTasks (name, tasks) {
    // Actualizo la lista de tareas del usuario
    return new Promise((resolve, reject) => {
      this.Users.findOneAndUpdate(
        { name }, { tasks },
        (err, user) => {
          if (err) reject(err)
          console.log('User updated successfully')
          resolve()
        }
      )
    })
  }

}


module.exports = MongoLib
