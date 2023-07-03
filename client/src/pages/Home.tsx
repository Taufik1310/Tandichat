import React, { useState, useContext, useEffect } from "react"
import Navigation from "../components/home/navigation/Navigation"
import ChatRoom from "../components/home/chatRoom/ChatRoom"
import Intro from "../components/home/intro/Intro"
import { ChatListContext, FriendContext, TokenContext, UserInfoContext } from "../Context"
import { getAllFriend } from "../Rest"

const Home = () => {
    const TOKEN = useContext(TokenContext)
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
    const [isUserInfoOpen, setIsUserInfoOpen] = useState<boolean>(false)
    const [chatData, setChatData] = useState({})
    const [userData, setUserData] = useState({})
    const [listFriend, setListFriend] = useState<any[]>()

    const fetchAllFriend =  async () => {
        const response  = await getAllFriend(TOKEN)
        setListFriend(response.data)
    }

    useEffect(() => {
        fetchAllFriend()
    }, [])

    const handleChatClicked = (data: any) => {
        setIsChatOpen(true)
        setChatData(data)
    }

    const handleClosedChat = () => {
        setIsChatOpen(false)
    }

    const handleClickedUser = (data: any) => {
        setIsUserInfoOpen(true)
        setUserData(data)
    }

    const handleClosedUser = () => {
        setIsUserInfoOpen(false)
    }

    const handleBlockedUser = () => {
        fetchAllFriend()
        handleClosedChat()
    }

    return (
        <ChatListContext.Provider value={{ onOpen: handleChatClicked, onClose: handleClosedChat  }}>
            <UserInfoContext.Provider value={{ onClick: handleClickedUser, onClose: handleClosedUser }}>
                <FriendContext.Provider value={{ 
                    onAcceptFriend: fetchAllFriend, 
                    onDeleteFriend: fetchAllFriend, 
                    onBlockedUser: handleBlockedUser,
                    listFriend: listFriend 
                }}>
                    <div className="max-h-screen w-screen bg-black text-blue-50 overflow-hidden flex">
                        <section className={`fixed sm:relative bg-gray-800 h-screen w-screen sm:w-5/12 lg:w-4/12 sm:border-r-[1px] border-r-gray-600 ${isUserInfoOpen ? 'z-[90]' : 'z-50' }`}>
                            <Navigation isUserInfoOpen={isUserInfoOpen} userData={userData} />
                        </section>
                        <section className={`fixed bg-gray-800 sm:relative h-screen w-screen sm:w-7/12 lg:w-8/12 ${isChatOpen ? 'z-[80]' : 'z-40'}`}>
                            { isChatOpen ?
                                <ChatRoom data={chatData}/>
                                :
                                <Intro />
                            }
                        </section>
                    </div>
                </FriendContext.Provider>
            </UserInfoContext.Provider>
        </ChatListContext.Provider>
    )
}

export default Home