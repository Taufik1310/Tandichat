import React from "react"
import ChatRoomBar from "./ChatRoomBar"
import ChatMessageInput from "./ChatMessageInput"
import ChatMessage from "./ChatMessage"

const ChatRoom = ({ data }: { data: object}) => {

    return (
        <div className="flex flex-col justify-between w-full h-full">
            <ChatRoomBar data={data}/>
            <ChatMessage />
            <ChatMessageInput />
        </div>
    )
}

export default ChatRoom