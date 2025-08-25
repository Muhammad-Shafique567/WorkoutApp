require('dotenv').config()

const express = require('express')

//express app 
const app = express()

//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//GET request handler (routes)
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to my app'})
})

//listen for requests
app.listen(process.env.PORT, () => {
    console.log('listening for requests on port 4000')
})

