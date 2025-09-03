import { useState } from 'react'
import { useWorkoutContext } from '../hooks/useWorkoutContext'


const WorkoutForm = () => {
    const {dispatch} = useWorkoutContext()

    const [title, setTitle] = useState('')
    const [weight, setWeight] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault() //prevent the default behavior of the form (which is to refresh the page)

        const workout = {title, weight, reps}

        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json() 

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setEmptyFields([])
            setError(null)
            console.log('new workout added', json)
            setTitle('')
            setReps('')
            setWeight('')
            dispatch({type: 'CREATE_WORKOUT', payload: json}) //dispatch action to add new workout to context state
        }
    }    

    return (
        <form className="create" onSubmit={handleSubmit}>
        
            <h3>Add a New Workout</h3>
            <label>Exercise Title: </label>
            <input
                type = "text"
                onChange = {(e) => setTitle(e.target.value)} //event object e, get the value of the input field and set it to title state
                value = {title}
                className = {emptyFields.includes('title') ? 'error' : ''} //if title is in emptyFields array, add error class
            />

            <label>Weight (kg): </label>
            <input
                type = "number"
                onChange = {(e) => setWeight(e.target.value)} //event object e, get the value of the input field and set it to title state
                value = {weight}
                className = {emptyFields.includes('weight') ? 'error' : ''} //if weight is in emptyFields array, add error class
            />

            <label>Reps: </label>
            <input
                type = "number"
                onChange = {(e) => setReps(e.target.value)} //event object e, get the value of the input field and set it to title state
                value = {reps}
                className = {emptyFields.includes('reps') ? 'error' : ''} //if reps is in emptyFields array, add error class
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>} {/*render the error message if there is an error*/}
        </form>
    )
}

export default WorkoutForm;