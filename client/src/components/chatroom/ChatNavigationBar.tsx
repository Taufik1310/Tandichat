import React from "react";
import ChatMenu from "./ChatMenu";
import ChatProfile from "./ChatProfile";

const LOGO = './assets/logo1.png'

const ChatNavigationBar = () => {
    return (
        <div className="flex justify-between items-center bg-gray-700 px-5 py-2">
            <ChatProfile />
            <ChatMenu />
        </div>
    )
}

export default ChatNavigationBar