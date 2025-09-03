import {useEffect} from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'


//components
import WorkoutDetails from '../components/WorkoutData'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {
    const API_URL = process.env.REACT_APP_API_URL; // Access the environment variable
    const {workouts, dispatch} = useWorkoutContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch("https://workoutapp-ps3e.onrender.com/api/workout");
            const jsonData = await response.json() //convert response to json

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: jsonData}) //dispatch action to set workouts in context state
            }
        }

        fetchWorkouts()
    }, [dispatch]) //when dispatch changes, useEffect will run again (to avoid warning in console)

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />

                ))}
            </div>
            <WorkoutForm/>
        </div>    
    )
}

export default Home;
