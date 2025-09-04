import { useWorkoutContext } from '../hooks/useWorkoutContext'
import { formatDistanceToNow } from 'date-fns'
import { API_ENDPOINTS } from '../config/api'
const WorkoutDetails = ({workout}) => {
    const {dispatch} = useWorkoutContext()

    const handleClick = async () => {
        const response = await fetch(API_ENDPOINTS.WORKOUT_BY_ID(workout._id), {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: json}) //dispatch action to remove deleted workout from context state
        }
    }

    return (
        <div className = "workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Weight (kg): </strong>{workout.weight}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default WorkoutDetails;