"use client"
import React, {PropsWithChildren} from 'react'

// Fix context type for state and setState
interface StateContextType {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
}

const StateContext = React.createContext<StateContextType>({
    state: "",
    setState: () => {},
});

const StateProvider = ({children}: PropsWithChildren) => {
    const [state, setState] = React.useState<string>("");
    return (
        <StateContext.Provider value={{state, setState}}>{children}</StateContext.Provider>
    )
}

export const useStateContext = () => React.useContext(StateContext);
export default StateProvider
