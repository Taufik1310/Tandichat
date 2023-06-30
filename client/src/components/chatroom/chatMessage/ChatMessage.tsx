import React from "react"
import ChatMessageHeader from "./ChatMessageHeader"
import ChatMessageInput from "./ChatMessageInput"
import ChatMessageBody from "./ChatMessageBody"

const ChatMessage = ({ data }: { data: object}) => {

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <ChatMessageHeader data={data}/>
            <ChatMessageBody />
            <ChatMessageInput />
        </div>
    )
}

export default ChatMessage