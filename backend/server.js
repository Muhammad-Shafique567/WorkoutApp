require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const cors = require('cors')  //import cors

//express app 
const app = express()

//middleware

//Enable CORS
app.use(cors({
    origin: 'https://workoutapp-1-8an2.onrender.com', // frontend URL
    methods: ['GET','POST','DELETE','PUT','PATCH'],
    credentials: true
}))

// 2Parse JSON
app.use(express.json())

// Logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)

//connect to the database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Successfully connected to the database, listening for requests on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

