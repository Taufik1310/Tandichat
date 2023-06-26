import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

const DEFAULT_AVATAR = './assets/default-avatar.png'

interface ChatFriendRequest {
    onClose: () => void
}

const ChatFriendRequest = ({ onClose }: ChatFriendRequest) => {
    const [dataExample, setDataExample] = useState([
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
            {
                id: 1,
                username: 'StevenTayler',
            },
            {
                id: 2,
                username: 'Slash GNR',
            },
            {
                id: 3,
                username: 'Jeff Scott',
            },
    ])

    const handleNotif = (id: number) => {
        const updatedData = dataExample.filter(item => item.id !== id);
        setDataExample(updatedData);
    }

    return (
        <div>
            <div className="bg-gray-800 absolute top-0 bottom-0 start-0 end-0 overflow-hidden scrollbar-none z-10">
                <div className="bg-gray-700 pt-14 pb-4 px-8 flex items-center gap-10 text-xl font-semibold sticky top-0 end-0 start-0">
                    <BiArrowBack size={22} className="cursor-pointer" onClick={onClose}/>
                    <p>Permintaan Pertemanan</p>
                </div>
                <ul className="h-screen px-6 py-6 overflow-y-scroll scrollbar-style">
                    { dataExample && 
                        dataExample.map((item) => (
                            <li className="flex justify-between items-center gap-x-6 py-2 mb-4">
                                <div className="flex gap-x-2 items-center">
                                    <div className='avatar'>
                                        <div className='max-h-10 max-w-10 object-cover flex-none rounded-full'>
                                            <img src={DEFAULT_AVATAR} alt="Foto Profil" />
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold">{item.username}</p>
                                        <p className="truncate text-xs text-gray-500">Mengajukan Pertemanan</p>
                                    </div>
                                </div>
                                <button className="text-xs border border-blue-600 rounded-full px-3 p-1 font-semibold hover:bg-blue-600" onClick={() => handleNotif(item.id)}>Terima</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ChatFriendRequest