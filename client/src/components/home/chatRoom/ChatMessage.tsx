import React, { useContext, useEffect, useRef, useState } from "react"
import { ChatListContext, MessageContext, WebSocketContext } from "../../../Context"
import { IoIosArrowUp, IoIosArrowRoundDown } from 'react-icons/io'

const DEFAULT_BG = './assets/default-bg.png'

const ChatMessage = ({ Id }: { Id: number }) => {
    const { messages, onClear }: any = useContext(WebSocketContext)
    const { allMessage, onLoad }: any = useContext(MessageContext)
    const { isSwitch } = useContext(ChatListContext)
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false)
    const bottomRef = useRef(null)
    const topRef = useRef(null)
    const clientRef = useRef(null)

    useEffect(() => {
        setIsLoad(false)
    }, [isSwitch])

    useEffect(() => {
        onClear()
        if (isLoad) {
            scrollToTop()
        } else {
            scrollToDown()
        }
    }, [allMessage])

    useEffect(() => {
        if (isLoad) {
            scrollToTop()
        } else if (messages.length > 0 && messages[messages.length - 1].type === 0) {
            scrollToDown()
        }
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

    const handleLoadMessage = async (cursor: number) => {
        onLoad(Id, cursor)
        setIsLoad(true)
    }

    const scrollToDown = () => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const scrollToTop = () => {
        topRef.current.scrollIntoView({ behavior: 'smooth' })
    }

    const handleScroll = () => {
        const scrollTop = clientRef.current.scrollTop
        const scrollHeight = clientRef.current.scrollHeight
        const clientHeight = clientRef.current.clientHeight

        if (scrollTop + clientHeight >= scrollHeight - 10) {
            setShowScrollButton(false)
        } else {
            setShowScrollButton(true)
        }
    }

    useEffect(() => {
        handleScroll()
        
        clientRef.current.addEventListener('scroll', handleScroll)
      }, [])

    return (
        <div 
            ref={clientRef}
            className="bg-gray-800 object-cover h-full max-h-full overflow-x-hidden overflow-y-auto scrollbar-style ps-2 pe-1 md:ps-5 md:pe-3 py-5 bg-cover bg-no-repeat relative"
            style={{ backgroundImage: `url(${DEFAULT_BG})` }}
        >
            <div ref={topRef}></div>
            <div className={`text-blue-50 text-xs flex flex-col items-center justify-center mx-auto mb-12 ${allMessage.next_cursor === 0 ? 'hidden' : ''}`}>
                <IoIosArrowUp />
                <button 
                    onClick={() => handleLoadMessage(allMessage.next_cursor)}
                    className="text-xs border border-blue-600 rounded-full px-3 p-1 font-semibold hover:bg-blue-600 flex flex-col items-center"
                >
                    <span>Muat Pesan Sebelumnya</span>
                </button>
            </div>
            <ul className="mt-5">
                { allMessage.messages &&
                    allMessage.messages.sort((a: any, b: any) => {
                        const dateA = new Date(a.CreatedAt).getTime()
                        const dateB = new Date(b.CreatedAt).getTime()
                        return dateA - dateB
                      }).map((message: any, index: any) => (
                        <li key={index} className={`chat text-sm ${ Id === message.UserID ? 'chat-start' : 'chat-end' }`}>
                            <div className={`chat-bubble ${ Id === message.UserID ? 'bg-gray-600' : 'bg-blue-600'} text-blue-50`}>
                                { message.Content &&
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
                { messages &&
                    messages.map((message: any, index: any) => (
                        <li key={index} className={`chat ${ 
                            message.type === 0 && Id !== message.data.to ? 'hidden' :
                            message.type === 1 && Id !== message.data.from ? 'hidden' :
                            ''
                        } text-sm ${ Id !== message.data.from ? 'chat-end' : 'chat-start' }`}>
                            <div className={`chat-bubble ${ Id !== message.data.to ? 'bg-gray-600' : 'bg-blue-600'} text-blue-50`}>
                                { message.data.message &&
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
            { showScrollButton && (
                <button 
                    onClick={scrollToDown}
                    className={`fixed end-5 bottom-20 bg-gray-700 text-blue-50 rounded-full p-2`}
                >
                    <IoIosArrowRoundDown size={26} />
                </button>
            )}
            <div ref={bottomRef}></div>
        </div>
    )
}

export default ChatMessage