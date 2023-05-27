import React, { useState } from 'react'

import { BiArrowBack } from 'react-icons/bi'

const DEFAULT_PROFILE = './assets/default-profile.png'

const dataExample = [
    {
        username: 'StevenTayler',
    },
    {
        username: 'Slash GNR',
    }
]

interface ChatNotifProps {
    onClose: () => void
}

const ChatNotif = ({ onClose }: ChatNotifProps) => {
    const [isOpenNotif, setIsOpenNotif] = useState<boolean>(false)

    return (
        <div>
            <div className="bg-gray-800 absolute top-0 bottom-0 start-0 end-0 overflow-y-auto scrollbar-none">
                <div className="bg-gray-700 pt-14 pb-4 px-8 flex items-center gap-10 text-xl font-semibold fixed top-0 w-full z-10">
                    <BiArrowBack size={22} className="cursor-pointer" onClick={onClose}/>
                    <p>Notifikasi</p>
                </div>
            </div>
            {/* <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl shadow-black bg-gray-700 w-52">
                { dataExample && 
                        dataExample.map((item) => (
                            <li className="flex justify-between items-center gap-x-6 py-2">
                                <div className="flex gap-x-2 items-center">
                                    <img className="max-h-8 max-w-8 flex-none rounded-full" src={DEFAULT_PROFILE} alt="Foto Profil" />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold">{item.username}</p>
                                        <p className="truncate text-xs text-gray-500">Mengajukan Pertemanan</p>
                                    </div>
                                </div>
                                <button className="text-xs border border-blue-600 rounded-full px-3 p-1 font-semibold hover:bg-blue-600">Terima</button>
                            </li>
                        ))
                    }

            </ul> */}
        </div>
    )
}

export default ChatNotif