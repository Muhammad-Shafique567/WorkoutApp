import { useWorkoutContext } from '../hooks/useWorkoutContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from '../hooks/useAuthContext'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutContext()
    const { user } = useAuthContext() //get user from auth context

    const API_URL = process.env.REACT_APP_API_URL

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch(`${API_URL}/api/workouts/` + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`  //Include JWT token in request headers for authentication
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    return (
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Weight (kg): </strong>{workout.weight}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails
