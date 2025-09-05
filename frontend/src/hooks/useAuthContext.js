import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) { //if context is used outside of a provider
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }

    return context
}