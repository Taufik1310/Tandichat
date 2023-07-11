import React, { useState, useContext, useEffect } from "react"
import UserMenu from "./UserMenu"
import MyProfile from "../myProfile/MyProfile"
import { FriendPendingContext, TokenContext } from "../../../Context"
import { getFriendPending } from "../../../Rest"

const NavigationBar = () => {
    const TOKEN = useContext(TokenContext)
    const [friendPending, setFriendPending] = useState<any[]>([])
    
    const fetchFriendPending = async () => {
        const response = await getFriendPending(TOKEN)
        setFriendPending(response.data.received)
    }

    useEffect(() => {
        fetchFriendPending()
    }, [])

    return (
        <FriendPendingContext.Provider value={{ 
            friendPending: friendPending,
            onAction: fetchFriendPending
         }}>
            <div className="flex justify-between items-center bg-gray-700 px-5 py-2 h-14 max-h-14">
                <MyProfile />
                <UserMenu />
            </div>
        </FriendPendingContext.Provider>
    )
}

export default NavigationBar