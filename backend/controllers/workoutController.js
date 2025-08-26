const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1}) //find all workouts and sort by createdAt in descending order
    res.status(200).json(workouts) //response with status 200 and the workouts
}

//GET a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Workout not found'})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: 'Workout not found'}) 
    } 

    res.status(200).json(workout)  
}

//CREATE new workout
const createWorkout = async (req, res) => {
    const {title, weight, reps} = req.body

    //add document to database
    try {
        const workout = await Workout.create({title, weight, reps})
        res.status(200).json(workout) //response with status 200 and the created workout
    } catch (error) {
        res.status(400).json({error: error.message}) //response with status 400 and the error message
    }
}

//DELETE a workout

//UPDATE a workout

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout
}