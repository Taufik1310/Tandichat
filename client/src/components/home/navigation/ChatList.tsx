import React, { useContext, useState, useEffect } from "react"
import { BASE_AVATAR_URL } from "../../../Rest"
import { ChatListContext, FriendContext } from "../../../Context"

const ChatList = ({ keyword }: { keyword: string }) => {
    const { onOpen, userId } = useContext(ChatListContext)
    const { listFriend } = useContext(FriendContext)
    const [filteredFriend, setFilteredFriend] = useState<any[]>([])

    const getCurrentDate = () => {
        const currentDate = new Date()
        const year = currentDate.getFullYear()
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0')
        const day = currentDate.getDate().toString().padStart(2, '0')
        const formattedDate = `${day}/${month}/${year}`

        return formattedDate
    }

    useEffect(() => {
        const filterFriend = listFriend.filter((friend) => {
            const name = friend.Username.toLowerCase()
            const key = keyword ? keyword.toLowerCase() : ''
            return name.includes(key)
        })
        setFilteredFriend(filterFriend)
    }, [keyword, listFriend])

    const handleChatClicked = (data: any) => {
        if (userId === data.Id) {
            return
        }
        onOpen(data)
    }

    return (
        <div className="mt-3">
            <ul className="px-1 h-[calc(100vh-8rem)] overflow-y-scroll scrollbar-style">
                { filteredFriend && 
                    filteredFriend.map((item, index) => (
                        <li 
                            key={index}
                            className="flex justify-between items-start gap-x-3 px-2 py-3 rounded-md hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleChatClicked(item)}
                        >
                            <div className="w-10/12 sm:w-9/12 lg:w-10/12 flex gap-x-2 items-center">
                                <div className="avatar">
                                    <div className="w-12 max-h-12 object-cover rounded-full">
                                        <img src={`${BASE_AVATAR_URL}/${item.Avatar}`} alt="Foto Profil"/>
                                    </div>
                                </div>
                                <div className="flex-auto overflow-hidden">
                                    <p className="truncate text-sm font-semibold">
                                        {
                                            Array.from(item.Username).map((char: any, index) => (
                                                <span className={`${keyword.toLowerCase().includes(char.toLowerCase()) ? 'text-blue-400' : ''}`} key={index}>{char}</span>
                                            ))
                                        }
                                    </p>
                                    <p className="truncate text-xs text-gray-400">{item.Email}</p>
                                </div>
                            </div>
                            <div className="text-end">
                                <div>
                                    <time className={`text-[10px] text-gray-400`}>
                                        {
                                            getCurrentDate()
                                        }
                                    </time>
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ChatList