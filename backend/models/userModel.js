const mongoose = require('mongoose')
const brcrypt = require('bcrypt')
const validator = require('validator')

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

// static signup method (includes validation)
userSchema.statics.signup = async function(email, password) { //cannot use arrow function here since we need 'this'

    //validation
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await brcrypt.genSalt(10) //use await since this step takes time
    const hashedPassword = await brcrypt.hash(password, salt)

    const user = await this.create({email, password: hashedPassword})
    return user
}

//static login method
userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })

    if (!user) {
        throw Error('Invalid login')
    }

    const match = await brcrypt.compare(password, user.password)
    
    if (!match) {
        throw Error('Invalid login')
    }

    return user
}

module.exports = mongoose.model('User', userSchema) //export model as User