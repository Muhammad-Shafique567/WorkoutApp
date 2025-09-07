const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => { //next to move to next middleware (always used for middleware)

    //verify user is authenticated
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1] //Get second part of the string (after space)

    try {
        const _id = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id') //add user id to request object (routes can access it)
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth