import React, { useContext } from "react"
import { BASE_AVATAR_URL } from "../../../Rest"
import { UserInfoContext } from "../../../Context"


const ChatMessageHeader = ({ data }: { data: {
    Avatar?: string,
    Username?: string
} }) => {
    const { Avatar, Username } = data
    const { onClick } = useContext(UserInfoContext)

    return (
        <div className="bg-gray-700 h-14 max-h-14 px-5 py-2 flex items-center">
            <div 
                className="avatar flex items-center w-10/12 cursor-pointer"
                onClick={() => onClick(data)}
            >
                <div className="w-10 max-h-10 object-cover rounded-full">
                    <img src={`${BASE_AVATAR_URL}/${Avatar}`} alt="Foto Profil"/>
                </div>
                <p className="truncate text-md font-bold ms-4">{Username}</p>
            </div>
        </div>
    )
}

export default ChatMessageHeader