import React from "react"
import ChatMessageHeader from "./ChatMessageHeader"
import ChatMessageInput from "./ChatMessageInput"

const ChatMessage = () => {
    return (
        <div className="relative bg-gray-800 h-screen w-screen sm:w-7/12 lg:w-8/12 flex flex-col justify-between">
            <ChatMessageHeader />
            <ChatMessageInput />
        </div>
    )
}

export default ChatMessage