import {useEffect} from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { API_ENDPOINTS } from '../config/api'

//components
import WorkoutDetails from '../components/WorkoutData'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {
    const {workouts, dispatch} = useWorkoutContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(API_ENDPOINTS.WORKOUTS);
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
