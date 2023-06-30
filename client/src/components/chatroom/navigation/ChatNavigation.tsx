import React from "react";
import ChatNavigationBar from "./ChatNavigationBar";
import ChatSearchbox from "./ChatSearchbox";
import ListFriend from "./listFriend";

const ChatNavigation = () => {
    return (
        <>
            <ChatNavigationBar/>
            <ChatSearchbox />
            <ListFriend />
        </>
    )
}

export default ChatNavigation