import React from "react";
import ChatNavigation from "../components/chatroom/navigation/ChatNavigation";
import ChatMessage from "../components/chatroom/chatMessage/ChatMessage";

const ChatRoom = () => {

    return (
        <div className="max-h-screen w-screen bg-black text-blue-50 overflow-hidden flex">
            <ChatNavigation />
            <ChatMessage />
        </div>
    )
}

export default ChatRoom