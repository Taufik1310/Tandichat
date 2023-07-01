import React from "react";
import ChatMenu from "./ChatMenu";
import MyProfile from "../myProfile/MyProfile";


const ChatNavigationBar = () => {
    return (
        <div className="flex justify-between items-center bg-gray-700 px-5 py-2 h-14 max-h-14">
            <MyProfile />
            <ChatMenu />
        </div>
    )
}

export default ChatNavigationBar