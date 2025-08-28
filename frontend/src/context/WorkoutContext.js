import {createContext} from 'react'

export const WorkoutsContext = createContext()

//children prop is whatever is inside the provider tags in index.js (in this case it's the entire app)
export const WorkoutsContextProvider = ({children}) => { 
    return (
        //Since children represents the entire app, everything inside the app will have access to the context
        <WorkoutsContext.Provider>
            { children }
        </WorkoutsContext.Provider>
    )
}

