import React from "react"
import ChatNavigation from "../components/chatroom/navigation/ChatNavigation"
import ChatMessage from "../components/chatroom/chatMessage/ChatMessage"
import { BaseAvatarURLContext } from "../Context"

const ChatRoom = () => {
    const BASE_AVATAR_URL = 'http://localhost:5050/static/profile'

    return (
        <BaseAvatarURLContext.Provider value={BASE_AVATAR_URL}>
            <div className="max-h-screen w-screen bg-black text-blue-50 overflow-hidden flex">
                <ChatNavigation />
                <ChatMessage />
            </div>
        </BaseAvatarURLContext.Provider>
    )
}

export default ChatRoom