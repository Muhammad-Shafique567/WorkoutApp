import { WorkoutsContext } from "../context/WorkoutContext";
import { use, useContext } from "react";

export const useWorkoutContext = () => {
    const context = useContext(WorkoutsContext)

    if (!context) { //if context is used outside of a provider
        throw Error('useWorkoutContext must be used inside an WorkoutsContextProvider')
    }

    return context
}