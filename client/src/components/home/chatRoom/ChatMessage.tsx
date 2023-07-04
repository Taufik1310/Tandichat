import React, { useContext } from "react"
import { BiLockAlt } from 'react-icons/bi'
import { WebSocketContext } from "../../../Context"

const DEFAULT_BG = './assets/default-bg.png'

const ChatMessage = ({ Id }: { Id: number }) => {
    const { messages } = useContext(WebSocketContext)

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
            className="bg-gray-800 object-cover h-full max-h-full overflow-auto scrollbar-style px-2 md:px-5 py-5"
            style={{ 
                backgroundImage: `url(${DEFAULT_BG})`
             }}
        >
            {/* <div className="bg-gray-500 text-blue-50 text-xs flex items-center justify-center gap-2 w-3/4 p-2 rounded-lg m-auto">
                <BiLockAlt />
                <p>Pesan dienkripsi secara end-to-end. Tidak ada orang yang diluar pesan ini, bahkan Tandichat, bisa membacanya.</p>
            </div> */}
            <ul className="mt-5">
                { messages.map((message) => (
                        <li className={`chat ${ 
                            message.type === 0 && Id !== message.data.to ? 'hidden' :
                            message.type === 1 && Id !== message.data.from ? 'hidden' :
                            ''
                        } text-sm ${ Id !== message.data.from ? 'chat-end' : 'chat-start' }`}>
                            <div className="chat-header">
                                <time className="text-xs opacity-50">
                                    {
                                        message.type === 0 ?
                                        getCurrentTime()
                                        :
                                        convertTimeString(message.data.time)
                                    }
                                </time>
                            </div>
                            <div className={`chat-bubble ${ Id !== message.data.to ? 'bg-gray-600' : 'bg-blue-600'} text-blue-50`}>{message.data.message}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ChatMessage