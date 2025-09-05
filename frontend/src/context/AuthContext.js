import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            return { user: action.payload } //payload is the user data
        case 'LOGOUT':
            return {user : null} //reset user to null on logout
        default:
            return state //return original state if action type doesn't match
    }
}

//provides state value to entire app since it wraps the entire app in index.js
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { //second arg user: null is the initial state
        user: null
    })

    console.log('AuthContext state: ', state)

    //State is the user object   
    return (
        <AuthContext.Provider value = {{...state, dispatch}}> 
            { children }
        </AuthContext.Provider>
    )
}