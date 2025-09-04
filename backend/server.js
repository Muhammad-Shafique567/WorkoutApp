require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')

const app = express()

// Enable CORS so the frontend can make requests
app.use(cors({
    origin: 'https://workoutapp-1-8an2.onrender.com', // frontend URL
    methods: ['GET','POST','DELETE','PUT','PATCH'],
    credentials: true
}))

// Parse JSON bodies
app.use(express.json())

// Log incoming requests (for debugging)
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// API routes
app.use('/api/workouts', workoutRoutes)

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const port = process.env.PORT || 4000
        app.listen(port, () => {
            console.log('Backend running on port', port)
        })
    })
    .catch(err => console.log(err))
