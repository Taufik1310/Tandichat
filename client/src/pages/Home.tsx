import React, { useState } from "react"
import Navigation from "../components/home/navigation/Navigation"
import ChatRoom from "../components/home/chatRoom/ChatRoom"
import Intro from "../components/home/intro/Intro"
import { ChatClickedContext, UserInfoContext } from "../Context"


const Home = () => {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
    const [isUserInfoOpen, setIsUserInfoOpen] = useState<boolean>(false)
    const [chatData, setChatData] = useState({})
    const [userData, setUserData] = useState({})

    const handleChatClicked = (data: any) => {
        setIsChatOpen(true)
        setChatData(data)
    }

    const handleClickedUser = (data: any) => {
        setIsUserInfoOpen(true)
        setUserData(data)
    }

    const handleClosedUser = () => {
        setIsUserInfoOpen(false)
    }

    return (
        <ChatClickedContext.Provider value={{ onClick: handleChatClicked  }}>
            <UserInfoContext.Provider value={{ onClick: handleClickedUser, onClose: handleClosedUser }}>
                <div className="max-h-screen w-screen bg-black text-blue-50 overflow-hidden flex">
                    <section className="fixed sm:relative bg-gray-800 h-screen w-screen sm:w-5/12 lg:w-4/12 sm:border-r-[1px] border-r-gray-600 z-50">
                        <Navigation isUserInfoOpen={isUserInfoOpen} userData={userData} />
                    </section>
                    <section className="fixed bg-gray-800 sm:relative h-screen w-screen sm:w-7/12 lg:w-8/12">
                        { isChatOpen ?
                            <ChatRoom data={chatData}/>
                            :
                            <Intro />
                        }
                    </section>
                </div>
            </UserInfoContext.Provider>
        </ChatClickedContext.Provider>
    )
}

export default Home