import {useEffect, useState} from 'react'

//components
import WorkoutDetails from '../components/WorkoutData'

const Home = () => {

    const [workouts, setWorkouts] = useState(null)

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts') //fetch data from backend and store in reponse
            const jsonData = await response.json() //convert response to json

            if (response.ok) {
                setWorkouts(jsonData)
            }
        }

        fetchWorkouts()
    }, [])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} />
                ))}
            </div>
        </div>    
    )
}

export default Home;