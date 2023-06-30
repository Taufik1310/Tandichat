import React, { useState } from "react"
import ChatNavigation from "../components/chatroom/navigation/ChatNavigation"
import ChatMessage from "../components/chatroom/chatMessage/ChatMessage"
import Intro from "../components/chatroom/intro/Intro"
import { ChatClickedContext } from "../Context"

const ChatRoom = () => {
    const [isChatOpen, setIsChatOpen] = useState<boolean>(false)
    const [chatData, setChatData] = useState({})

    const handleChatClicked = (data: any) => {
        setIsChatOpen(true)
        setChatData(data)
    }

    return (
        <ChatClickedContext.Provider value={{ onClick: handleChatClicked  }}>
            <div className="max-h-screen w-screen bg-black text-blue-50 overflow-hidden flex">
                <section className="fixed sm:relative bg-gray-800 h-screen w-screen sm:w-5/12 lg:w-4/12 sm:border-r-[1px] border-r-gray-600 z-50">
                    <ChatNavigation />
                </section>
                <section className="fixed bg-gray-800 sm:relative h-screen w-screen sm:w-7/12 lg:w-8/12">
                    { isChatOpen ?
                        <ChatMessage data={chatData}/>
                        :
                        <Intro />
                    }
                </section>
            </div>
        </ChatClickedContext.Provider>
    )
}

export default ChatRoom