import React from "react"

const DEFAULT_AVATAR = './assets/default-avatar.png'

const ChatMessageHeader = () => {
    return (
        <div className="bg-gray-700 h-14 max-h-14 px-5 py-2 flex items-center">
            <div className="avatar flex items-center">
                <div className="w-10 max-h-10 object-cover rounded-full">
                    <img src={DEFAULT_AVATAR} alt="Foto Profil"/>
                </div>
                <p className="truncate text-md font-bold ms-4">Nayl Author</p>
            </div>
        </div>
    )
}

export default ChatMessageHeader