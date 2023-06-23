import { createContext } from 'react'

interface IsLoggedInContextype {
    onLogin: Function, 
    onLogout: Function 
}

export const IsLoggedInContex = createContext<IsLoggedInContextype>({
    onLogin: () => {},
    onLogout: () => {}
})

export const TokenContext = createContext<string>('')