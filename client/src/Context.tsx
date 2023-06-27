import { createContext } from 'react'

interface AuthContext {
    onLogin: Function, 
    onLogout: Function 
}

export const AuthContext = createContext<AuthContext>({
    onLogin: () => {},
    onLogout: () => {}
})

export const TokenContext = createContext<string>('')

export const BaseAvatarURLContext = createContext<string>('')