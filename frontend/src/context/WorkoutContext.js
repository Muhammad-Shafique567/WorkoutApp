import {createContext} from 'react'
import {useReducer} from 'react'

export const WorkoutsContext = createContext()

export const workoutsReducer = (state, action) => {
    switch(action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload, ...state.workouts] //add new workout to the beginning of the array (spread operator to copy all the existing workouts)
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id) //return all workouts except the deleted one
            }
        default:
            return state   
    }
}

//children prop is whatever is inside the provider tags in index.js (in this case it's the entire app)
export const WorkoutsContextProvider = ({children}) => { 
    const [state, dispatch] = useReducer(workoutsReducer, { //call reducer function
        workouts: null
    })

    return (
        //Since children represents the entire app, everything inside the app will have access to state and dispatch
        <WorkoutsContext.Provider value={{...state, dispatch}}>
            { children }
        </WorkoutsContext.Provider>
    )
}

