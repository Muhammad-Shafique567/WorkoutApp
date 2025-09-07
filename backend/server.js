require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express()

// Enable CORS so the frontend can make requests
app.use(cors({
    origin: 'https://workoutapp-frontend-j4ve.onrender.com', // frontend URL
    methods: ['GET','POST','DELETE','PUT','PATCH'],
    credentials: true
}))


// Middleware
app.use(express.json())

// Log incoming requests
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// API routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        const port = process.env.PORT || 4000
        app.listen(port, () => {
            console.log('Backend running on port', port)
        })
    })
    .catch(err => console.log(err))
