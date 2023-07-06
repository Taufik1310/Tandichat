import React, { useContext } from "react"
import { BASE_AVATAR_URL } from "../../../Rest"
import { ChatListContext, FriendContext } from "../../../Context"

const ChatList = () => {
    const { onOpen } = useContext(ChatListContext)
    const { listFriend } = useContext(FriendContext)

    return (
        <div className="mt-3">
            <ul className="px-1 h-[calc(100vh-8rem)] overflow-y-scroll scrollbar-style">
                { listFriend && 
                    listFriend.map((item, index) => (
                        <li 
                            key={index}
                            className="flex justify-between items-start gap-x-3 px-2 py-3 rounded-md hover:bg-gray-700 cursor-pointer"
                            onClick={() => onOpen(item)}
                        >
                            <div className="w-10/12 sm:w-9/12 lg:w-10/12 flex gap-x-2 items-center">
                                <div className="avatar">
                                    <div className="w-12 max-h-12 object-cover rounded-full">
                                        <img src={`${BASE_AVATAR_URL}/${item.Avatar}`} alt="Foto Profil"/>
                                    </div>
                                </div>
                                <div className="flex-auto overflow-hidden">
                                    <p className="truncate text-sm font-semibold">{item.Username}</p>
                                    {/* <p className="truncate text-xs text-gray-400">{item.lastChat}</p> */}
                                    <p className="truncate text-xs text-gray-400">Lorem ipsum dolor sit amet.</p>
                                </div>
                            </div>
                            <div className="text-end">
                                <div>
                                    {/* <time className={`text-[10px] ${item.unreadChat.length === 0 ? 'text-gray-400' : 'text-blue-600 fw-bold'}`}>{item.lastDate}</time> */}
                                    <time className={`text-[10px] text-gray-400`}>10/05/2023</time>
                                </div>
                                {/* {item.unreadChat.length !== 0 && 
                                    <span className="badge bg-blue-600 text-slate-50 border-0 text-xs">{item.unreadChat.length}</span>
                                } */}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ChatList