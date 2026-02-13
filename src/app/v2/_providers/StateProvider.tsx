"use client"
import React, {PropsWithChildren} from 'react'

const StateContext = React.createContext({});

const StateProvider = ({children}: PropsWithChildren) => {
    const [state, setState] = React.useState<String>("");
    return (
        <StateContext.Provider value={{state, setState}}>{children}</StateContext.Provider>
    )
}

export const useStateContext = () => React.useContext(StateContext);
export default StateProvider
