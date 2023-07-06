import React, { useContext, useEffect, useRef } from "react"
import { ChatListContext, TokenContext, WebSocketContext } from "../../../Context"
import { getMessages } from "../../../Rest"

const DEFAULT_BG = './assets/default-bg.png'

const ChatMessage = ({ Id }: { Id: number }) => {
    const TOKEN = useContext(TokenContext)
    const { messages, onClear } = useContext(WebSocketContext)
    const { allMessage }: any = useContext(ChatListContext)
    const scrollRef = useRef(null)
    // const allMessages = allMessage.message

    useEffect(() => {
        onClear()
        scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [allMessage])

    useEffect(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const getCurrentTime = () => {
        const currentTime = new Date()
        const currentHours = currentTime.getHours().toString().padStart(2, '0')
        const currentMinutes = currentTime.getMinutes().toString().padStart(2, '0')
        const currentTimeString = `${currentHours}:${currentMinutes}`

        return currentTimeString
    }

    const convertTimeString = (timeString: string) => {
        const time = new Date(timeString)
        const hours = time.getHours().toString().padStart(2, '0')
        const minutes = time.getMinutes().toString().padStart(2, '0')
        const result = `${hours}:${minutes}`

        return result
    }

    // const handleLoadMessage = async (cursor: number) => {
    //     const response = await getMessages(TOKEN, Id, cursor)
    //     allMessages.push(response.data.message)
    // }

    return (
        <div 
            className="bg-gray-800 object-cover h-full max-h-full overflow-x-hidden overflow-y-auto scrollbar-style ps-2 pe-1 md:ps-5 md:pe-3 py-5"
            style={{ backgroundImage: `url(${DEFAULT_BG})` }}
        >
            <div className="text-blue-50 text-xs flex items-center justify-center m-auto">
                <button 
                    // onClick={() => handleLoadMessage(allMessage.next_cursor)}
                    className="bg-gray-900 p-2 px-3 rounded-lg border border-gray-600"
                >Muat Pesan Sebelumnya</button>
            </div>
            <ul className="mt-5">
                { allMessage.message &&
                    allMessage.message.sort((a: any, b: any) => {
                        const dateA = new Date(a.CreatedAt).getTime()
                        const dateB = new Date(b.CreatedAt).getTime()
                        return dateA - dateB
                      }).map((message: any, index: any) => (
                        <li key={index} className={`chat text-sm ${ Id === message.UserID ? 'chat-start' : 'chat-end' }`}>
                            <div className={`chat-bubble ${ Id === message.UserID ? 'bg-gray-600' : 'bg-blue-600'} text-blue-50`}>
                                { 
                                    message.Content.split('\n').map((line: any, index: any) => (
                                        <p key={index} className="break-all">
                                            {line}
                                        </p>
                                    ))
                                }
                                <div className={`chat-footer p-0 ${ Id === message.UserID ? 'text-end' : 'text-start'}`}>
                                    <time className="text-[10px] opacity-50">
                                        {
                                            convertTimeString(message.CreatedAt)
                                        }
                                    </time>
                                </div>
                            </div>
                        </li>
                    ))
                }
                { messages.map((message, index) => (
                        <li key={index} className={`chat ${ 
                            message.type === 0 && Id !== message.data.to ? 'hidden' :
                            message.type === 1 && Id !== message.data.from ? 'hidden' :
                            ''
                        } text-sm ${ Id !== message.data.from ? 'chat-end' : 'chat-start' }`}>
                            <div className={`chat-bubble ${ Id !== message.data.to ? 'bg-gray-600' : 'bg-blue-600'} text-blue-50`}>
                                { 
                                    message.data.message.split('\n').map((line: any, index: any) => (
                                        <p key={index} className="break-all">
                                            {line}
                                        </p>
                                    ))
                                }
                                <div className={`chat-footer p-0 ${ Id === message.UserID ? 'text-end' : 'text-start'}`}>
                                    <time className="text-[10px] opacity-50">
                                        {
                                            message.type === 0 ?
                                            getCurrentTime()
                                            :
                                            convertTimeString(message.data.time)
                                        }
                                    </time>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div ref={scrollRef}></div>
        </div>
    )
}

export default ChatMessage