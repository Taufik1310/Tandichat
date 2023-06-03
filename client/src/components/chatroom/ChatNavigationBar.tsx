import React from "react";
import ChatMenu from "./ChatMenu";
import ChatProfile from "./ChatProfile";

const LOGO = './assets/logo1.png'

const ChatNavigationBar = ({ onLogout }: { onLogout: Function }) => {
    return (
        <div className="flex justify-between items-center bg-gray-700 px-5 py-2 h-14 max-h-14">
            <ChatProfile />
            <ChatMenu onLogout={onLogout}/>
        </div>
    )
}

export default ChatNavigationBar