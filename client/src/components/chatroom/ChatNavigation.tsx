import React from "react";
import ChatNavigationBar from "./ChatNavigationBar";
import ChatSearchbox from "./ChatSearchbox";
import ChatList from "./ChatList";

const ChatNavigation = () => {
    return (
        <div className="relative bg-gray-800 h-screen w-screen sm:w-5/12 lg:w-4/12">
            <div>
                <ChatNavigationBar />
                <ChatSearchbox />
            </div>
            <ChatList />
        </div>
    )
}

export default ChatNavigation