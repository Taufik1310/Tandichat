import { createContext } from 'react'

interface AuthContext {
    onLogin: Function, 
    onLogout: Function ,
}

export const AuthContext = createContext<AuthContext>({
    onLogin: () => {},
    onLogout: () => {},
})

export const TokenContext = createContext<string>('')

// export const BaseAvatarURLContext = createContext<string>('')

export const ChatListContext = createContext({
    onOpen: (data: any) => {},
    onClose: () => {}
})

export const UserInfoContext = createContext({
    onClick: (data: any) => {},
    onClose: () => {}
})

export const FriendContext = createContext({
    onAcceptFriend: () => {},
    onDeleteFriend: () => {},
    listFriend: []
})