import React, { useContext, useEffect, useRef } from "react"
import { BiLockAlt } from 'react-icons/bi'
import { ChatListContext, WebSocketContext } from "../../../Context"

const DEFAULT_BG = './assets/default-bg.png'

const ChatMessage = ({ Id }: { Id: number }) => {
    const { messages, onClear } = useContext(WebSocketContext)
    const { allMessage } = useContext(ChatListContext)
    const scrollRef = useRef(null)

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

    return (
        <div 
            className="bg-gray-800 object-cover h-full max-h-full overflow-x-hidden overflow-y-auto scrollbar-style ps-2 pe-1 md:ps-5 md:pe-3 py-5"
            style={{ backgroundImage: `url(${DEFAULT_BG})` }}
        >
            {/* <div className="text-blue-50 text-xs flex items-center justify-center m-auto">
                <p className="bg-gray-900 p-2 px-3 rounded-lg">Hari Ini</p>
            </div> */}
            <ul className="mt-5">
                { allMessage &&
                    allMessage.sort((a, b) => {
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