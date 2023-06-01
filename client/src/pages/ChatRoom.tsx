import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import ChatNavigation from "../components/chatroom/ChatNavigation";
import ChatMessage from "../components/chatroom/ChatMessage";

const ChatRoom = () => {

    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description" content="Tandichat ChatRoom" />
            </Helmet>
            <div className="max-h-screen w-screen bg-black text-blue-50 overflow-hidden flex">
                <ChatNavigation />
                <ChatMessage />
            </div>
        </HelmetProvider>
    )
}

export default ChatRoom