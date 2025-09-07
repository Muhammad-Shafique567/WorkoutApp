import {useEffect} from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { useAuthContext } from '../hooks/useAuthContext'

//components
import WorkoutDetails from '../components/WorkoutData'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch} = useWorkoutContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
            
            const response = await fetch(`/api/workouts/`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`  //Include JWT token in request headers for authentication
                }
            });
            const jsonData = await response.json() //convert response to json

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: jsonData}) //dispatch action to set workouts in context state
            }
        }

        if (user) {
            fetchWorkouts()
        }
    }, [dispatch, user]) //when dispatch changes, useEffect will run again (to avoid warning in console)

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