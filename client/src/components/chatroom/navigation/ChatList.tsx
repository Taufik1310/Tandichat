import React from "react"

const DEFAULT_AVATAR = './assets/default-avatar.png'

interface ChatListData {
    username: string,
    lastChat: string,
    lastDate: string,
    unreadChat: any[] | string,
}

const ChatList = () => {
    const dataExample: ChatListData[] = [
        {
            username: 'Nayl Author',
            lastChat: 'Kumaha pik',
            lastDate: '19:30',
            unreadChat: [],
        },
        {
            username: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam cupiditate tempore consectetur',
            lastChat: 'Okeh',
            lastDate: '11/30/2018',
            unreadChat: [],
        },
        {
            username: 'Tukang Galon',
            lastChat: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam cupiditate tempore consectetur',
            lastDate: 'Yesterday',
            unreadChat: [],
        },
        {
            username: 'Dia',
            lastChat: 'awokwowowkowkwowk',
            lastDate: '11:10',
            unreadChat: [
                'test',
                'test',
                'test',
            ],
        },
        {
            username: 'Nayl Author',
            lastChat: 'Kumaha pik',
            lastDate: '19:30',
            unreadChat: [],
        },
        {
            username: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam cupiditate tempore consectetur',
            lastChat: 'Okeh',
            lastDate: '11/30/2018',
            unreadChat: [],
        },
        {
            username: 'Tukang Galon',
            lastChat: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam cupiditate tempore consectetur',
            lastDate: 'Yesterday',
            unreadChat: [],
        },
        {
            username: 'Dia',
            lastChat: 'awokwowowkowkwowk',
            lastDate: '11:10',
            unreadChat: [
                'test',
                'test',
                'test',
            ],
        },
        {
            username: 'Nayl Author',
            lastChat: 'Kumaha pik',
            lastDate: '19:30',
            unreadChat: [],
        },
        {
            username: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam cupiditate tempore consectetur',
            lastChat: 'Okeh',
            lastDate: '11/30/2018',
            unreadChat: [],
        },
        {
            username: 'Tukang Galon',
            lastChat: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam cupiditate tempore consectetur',
            lastDate: 'Yesterday',
            unreadChat: '',
        },
        {
            username: 'Dia',
            lastChat: 'awokwowowkowkwowk',
            lastDate: '11:10',
            unreadChat: [
                'test',
                'test',
                'test',
            ],
        },
        {
            username: 'Nayl Author',
            lastChat: 'Kumaha pik',
            lastDate: '19:30',
            unreadChat: [],
        },
        {
            username: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam cupiditate tempore consectetur',
            lastChat: 'Okeh',
            lastDate: '11/30/2018',
            unreadChat: [],
        },
        {
            username: 'Tukang Galon',
            lastChat: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam cupiditate tempore consectetur',
            lastDate: 'Yesterday',
            unreadChat: '',
        },
        {
            username: 'Dia',
            lastChat: 'awokwowowkowkwowk',
            lastDate: '11:10',
            unreadChat: [
                'test',
                'test',
                'test',
            ],
        },
    ]

    return (
        <div className="mt-3">
            <ul className="px-2 h-[calc(100vh-8rem)] overflow-y-scroll scrollbar-style">
                { dataExample && 
                    dataExample.map((item) => (
                        <li className="flex justify-between items-start gap-x-3 px-2 py-3 rounded-md hover:bg-gray-700">
                            <div className="w-10/12 sm:w-9/12 lg:w-10/12 flex gap-x-2 items-center">
                                <div className="avatar">
                                    <div className="w-12 max-h-12 object-cover rounded-full">
                                        <img src={DEFAULT_AVATAR} alt="Foto Profil"/>
                                    </div>
                                </div>
                                <div className="flex-auto overflow-hidden">
                                    <p className="truncate text-sm font-semibold">{item.username}</p>
                                    <p className="truncate text-xs text-gray-400">{item.lastChat}</p>
                                </div>
                            </div>
                            <div className="text-end">
                                <div>
                                    <time className={`text-[10px] ${item.unreadChat.length === 0 ? 'text-gray-400' : 'text-blue-600 fw-bold'}`}>{item.lastDate}</time>
                                </div>
                                {item.unreadChat.length !== 0 && 
                                    <span className="badge bg-blue-600 text-slate-50 border-0 text-xs">{item.unreadChat.length}</span>
                                }
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default ChatList