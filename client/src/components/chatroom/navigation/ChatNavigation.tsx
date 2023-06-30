import React from "react"
import ChatNavigationBar from "./ChatNavigationBar"
import ChatSearchbox from "./ChatSearchbox"
import ListFriend from "./ListFriend"
import UserInfo from "../userInfo/UserInfo"

const ChatNavigation = ({ isUserInfoOpen, userData }: { isUserInfoOpen: boolean, userData?: any }) => {
    

    return (
        <>
            { isUserInfoOpen ?
                <UserInfo data={userData} />
                :
                <>
                    <ChatNavigationBar/>
                    <ChatSearchbox />
                    <ListFriend />
                </>
            }
        </>
    )
}

export default ChatNavigation