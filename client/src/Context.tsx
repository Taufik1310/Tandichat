import { createContext } from 'react'

interface UserData {
    id?: number,
    username?: string,
    email?: string,
    img?: string,
    about?: string
}

export const UserContext = createContext<UserData>({
    id: 0,
    username: '',
    email: '',
    img: '',
    about: '',
})