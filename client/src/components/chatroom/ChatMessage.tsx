import React from "react"
import ChatMessageHeader from "./ChatMessageHeader"
import ChatMessageInput from "./ChatMessageInput"
import ChatMessageBody from "./ChatMessageBody"

const ChatMessage = () => {
    return (
        <div className="relative h-screen w-screen sm:w-7/12 lg:w-8/12 flex flex-col justify-between">
            <ChatMessageHeader />
            <ChatMessageBody />
            <ChatMessageInput />
        </div>
    )
}

export default ChatMessage