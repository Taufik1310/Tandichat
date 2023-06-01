import React from "react"
import { BiLockAlt } from 'react-icons/bi'

const DEFAULT_BG = './assets/default-bg.png'

const ChatMessageBody = () => {
    return(
        <div 
            className="bg-gray-800 object-cover h-full max-h-full overflow-auto scrollbar-style px-5 py-5"
            style={{ 
                backgroundImage: `url(${DEFAULT_BG})`
             }}
        >
            <div className="bg-gray-500 text-blue-50 text-xs flex items-center justify-center gap-2 w-3/4 p-2 rounded-lg m-auto">
                <BiLockAlt />
                <p>Pesan dienkripsi secara end-to-end. Tidak ada orang yang diluar pesan ini, bahkan Tandichat, bisa membacanya.</p>
            </div>
            <div className="mt-5">
                <div className="chat chat-start text-sm">
                    <div className="chat-header">
                        <time className="text-xs opacity-50">19:45</time>
                    </div>
                    <div className="chat-bubble bg-gray-600 text-blue-50">Kumaha pik</div>
                </div>
                <div className="chat chat-start text-sm">
                    <div className="chat-header">
                        <time className="text-xs opacity-50">19:46</time>
                    </div>
                    <div className="chat-bubble bg-gray-600 text-blue-50">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores facere veritatis ipsam, ipsa enim voluptatum expedita! Quaerat, vero minima perspiciatis, at, ipsam eaque eum iure ipsum fugiat sapiente facere et?</div>
                </div>
                <div className="chat chat-end text-sm">
                    <div className="chat-header">
                        <time className="text-xs opacity-50">20:00</time>
                    </div>
                    <div className="chat-bubble bg-blue-600 text-blue-50">Pe</div>
                </div>
                <div className="chat chat-end text-sm">
                    <div className="chat-header">
                        <time className="text-xs opacity-50">20:00</time>
                    </div>
                    <div className="chat-bubble bg-blue-600 text-blue-50">Bang Nayl</div>
                </div>
                <div className="chat chat-end text-sm">
                    <div className="chat-header">
                        <time className="text-xs opacity-50">20:01</time>
                    </div>
                    <div className="chat-bubble bg-blue-600 text-blue-50">Boleeeeh</div>
                </div>
                <div className="chat chat-start text-sm">
                    <div className="chat-header">
                        <time className="text-xs opacity-50">23:11</time>
                    </div>
                    <div className="chat-bubble bg-gray-600 text-blue-50">Yaudaahh</div>
                </div>
                <div className="chat chat-end text-sm">
                    <div className="chat-bubble bg-blue-600 text-blue-50">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, possimus. Incidunt, rerum repudiandae? Qui, nisi repudiandae rerum saepe, officia iusto nobis ipsam labore vitae asperiores aut eveniet voluptatibus eos repellat.</div>
                </div>
                <div className="chat chat-start text-sm">
                    <div className="chat-bubble bg-gray-600 text-blue-50">Yaudaahh</div>
                </div>
                <div className="chat chat-end text-sm">
                    <div className="chat-bubble bg-blue-600 text-blue-50">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, possimus. Incidunt, rerum repudiandae? Qui, nisi repudiandae rerum saepe, officia iusto nobis ipsam labore vitae asperiores aut eveniet voluptatibus eos repellat.</div>
                </div>
                <div className="chat chat-start text-sm">
                    <div className="chat-bubble bg-gray-600 text-blue-50">Yaudaahh</div>
                </div>
                <div className="chat chat-end text-sm">
                    <div className="chat-bubble bg-blue-600 text-blue-50">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, possimus. Incidunt, rerum repudiandae? Qui, nisi repudiandae rerum saepe, officia iusto nobis ipsam labore vitae asperiores aut eveniet voluptatibus eos repellat.</div>
                </div>
                <div className="chat chat-start text-sm">
                    <div className="chat-bubble bg-gray-600 text-blue-50">Yaudaahh</div>
                </div>
                <div className="chat chat-end text-sm">
                    <div className="chat-bubble bg-blue-600 text-blue-50">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam, possimus. Incidunt, rerum repudiandae? Qui, nisi repudiandae rerum saepe, officia iusto nobis ipsam labore vitae asperiores aut eveniet voluptatibus eos repellat.</div>
                </div>
            </div>
        </div>
    )
}

export default ChatMessageBody