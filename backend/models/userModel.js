const mongoose = require('mongoose')
const brcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method  
userSchema.statics.signup = async function(email, password) { //cannot use arrow function here since we need 'this'

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await brcrypt.genSalt(10) //use await since this step takes time
    const hashedPassword = await brcrypt.hash(password, salt)

    const user = await this.create({email, password: hashedPassword})
    return user
}

module.exports = mongoose.model('User', userSchema) //export model as User