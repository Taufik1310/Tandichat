import React from "react"
import NavigationBar from "./NavigationBar"
import ChatSearch from "./ChatSearch"
import ChatList from "./ChatList"
import UserInfo from "../userInfo/UserInfo"

const Navigation = ({ isUserInfoOpen, userData }: { isUserInfoOpen: boolean, userData?: any }) => {

    return (
        <>
            { !isUserInfoOpen ?
                <>
                    <NavigationBar/>
                    <ChatSearch />
                    <ChatList />
                </>
                :
                <UserInfo data={userData} />
            }
        </>
    )
}

export default Navigation