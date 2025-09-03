import {useEffect} from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'

//components
import WorkoutDetails from '../components/WorkoutData'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
    const {workouts, dispatch} = useWorkoutContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts') //fetch data from backend and store in reponse
            const jsonData = await response.json() //convert response to json

            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: jsonData}) //dispatch action to set workouts in context state
            }
        }

        fetchWorkouts()
    }, []) //runs only once since dependency array is empty

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