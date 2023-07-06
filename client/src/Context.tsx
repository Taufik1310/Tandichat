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

export const WebSocketContext = createContext({
    onSend: (to: number, message: any) => {},
    onClear: () => {},
    messages: []
})

export const ChatListContext = createContext({
    onOpen: (data: any) => {},
    onClose: () => {},
    allMessage: {},
})

export const UserInfoContext = createContext({
    onClick: (data: any) => {},
    onClose: () => {}
})

interface FriendContext {
    onAcceptFriend: Function,
    onDeleteFriend: Function,
    onBlockedUser: Function,
    listFriend: any[]
}

export const FriendContext = createContext<FriendContext>({
    onAcceptFriend: () => {},
    onDeleteFriend: () => {},
    onBlockedUser: () => {},
    listFriend: []
})
